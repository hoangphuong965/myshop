/* eslint-disable import/no-anonymous-default-export */
import React, { Component } from "react";
import axios from "axios";

export default (ChildComponent) => {
  class ComposedComponent extends Component {
    // Our component just got rendered
    componentDidMount() {
      this.shouldNavigateAway();
    }

    // Our component just got updated
    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    async shouldNavigateAway() {
      const res = await axios.get("/api/v1/current_user");
      if (res.data.role !== "admin") {
        this.props.history.push("/");
      } else {
        return;
      }
    }
    render() {
      return <ChildComponent {...this.props} />;
    }
  }

  return ComposedComponent;
};
