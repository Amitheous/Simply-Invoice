import React, { Component } from "react";
import { Container, Row, Card } from "reactstrap";
import { connect } from "react-redux";

import KeenDataviz from "keen-dataviz";
import KeenAnalysis from "keen-analysis";
import { keenProjectId } from "../../config/keys";
import { keenReadKey } from "../../config/keys";

class Analytics extends Component {
  componentDidMount() {
    if (this.props.auth.user.admin === true) {
      const client = new KeenAnalysis({
        projectId: keenProjectId,
        readKey: keenReadKey
      });

      const pagesViewedChart = new KeenDataviz({
        container: "#pages-viewed",
        title: "24 Hour Pages viewed",

        type: "pie",
        colors: [
          "silver",
          "orange",
          "black",
          "purple",
          "teal",
          "green",
          "yellow",
          "black"
        ],
        legend: {
          pagination: {
            limit: 10
          }
        }
      });

      const totalViewsChart = new KeenDataviz({
        container: "#total-views",
        title: "Total views",
        type: "areachart",
        colors: ["blue", "yellow"]
      });

      const uniqueUsersChart = new KeenDataviz({
        container: "#unique-users",
        type: "areachart",
        title: "Unique visitors"
      });

      client
        .query("count", {
          event_collection: "pageviews",
          group_by: ["url.info.path"],
          timeframe: "this_24_hours",
          filters: [
            {
              property_name: "url.info.path",
              operator: "ne",
              property_value: "/analytics"
            }
          ]
        })
        .then(function(res) {
          pagesViewedChart.data(res).render();
        })
        .catch(function(err) {
          pagesViewedChart.message(err.message);
        });

      client
        .query("count", {
          event_collection: "pageviews",
          timeframe: "this_2_hours",
          interval: "minutely"
        })
        .then(res => totalViewsChart.data(res).render())
        .catch(err => totalViewsChart.message(err.message));

      client
        .query("count_unique", {
          event_collection: "pageviews",
          target_property: "user.uuid",
          timeframe: "this_7_days",
          interval: "daily"
        })
        .then(res => uniqueUsersChart.data(res).render())
        .catch(err => uniqueUsersChart.message(err.message));
    } else {
      this.props.history.push("/dashboard");
    }
  }
  o;

  render() {
    return (
      <Container>
        <Row className="text-center my-3">
          <div className="col-sm-6 px-2">
            <Card color="light">
              <div className="chart-wrapper">
                <div className="chart-stage">
                  <div id="pages-viewed" />
                </div>
              </div>
            </Card>
          </div>
          <div className="col-sm-6 px-2">
            <Card color="light">
              <div className="chart-wrapper">
                <div className="chart-stage">
                  <div id="total-views" />
                </div>
              </div>
            </Card>
          </div>
        </Row>
        <Row className="text-center my-3">
          <Card color="light" className="col-sm-12 mx-2">
            <div className="chart-wrapper">
              <div className="chart-stage">
                <div id="unique-users" />
              </div>
            </div>
          </Card>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  {}
)(Analytics);
