import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import Layout from "./hoc/Layout/Layout";
import Login from "./containers/Auth/Login/Login";
import Upload from "./containers/User/Upload/Upload";
import ImageGrid from "./containers/User/ImageGrid/ImageGrid";
import CaptureEvent from "./hoc/CaptureEvent/CaptureEvent";
import Map from "./containers/AdminDash/Map/Map";
import Statistics from "./containers/AdminDash/AIStats/Statistics";
import { AdminRoute, UserRoute } from "./components/Routes";

import userArea from "./components/User/UserArea";
import adminArea from "./containers/AdminDash/AdminArea";
import ProjectDetail from "./containers/ProjectDetails/ProjectDetail";
import AdProjectDetail from "./containers/AdminDash/ProjectDetails";

setupLogRocketReact(LogRocket);
LogRocket.init("raqbpx/dg7");

const app = () => {
  const routes = (
    <Switch>
      <Route path="/upload" component={Upload}></Route>
      <UserRoute path="/userArea" exact component={userArea} />
      <AdminRoute path="/adminArea" exact component={adminArea} />
      <Route
        path="/project/:projectId/image-grid"
        exact
        component={ImageGrid}
      />
      <Route
        path="/project/:projectId/capture-event/:captureEventId/form"
        exact
        component={CaptureEvent}
      />
      <UserRoute path="/project/:_id" component={ProjectDetail} />
      <AdminRoute path="/adproject/:_id" component={AdProjectDetail} />
      <Route path="/upload" component={Upload} />
      <AdminRoute path="/Map" exact component={Map} />
      <AdminRoute path="/Statistics" exact component={Statistics} />
      <Route path="/" exact component={Login} />
      <Redirect to="/" />
    </Switch>
  );

  return <Layout>{routes}</Layout>;
};

export default app;
