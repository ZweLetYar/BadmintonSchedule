import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Layout from "../Layout/Layout";

import Home from "../pages/MainApp/Home";
import { AuthContext } from "../Context/AuthContext";

import CreatePlayer from "../pages/Admin/CreatePlayer";
import CreateTeam from "../pages/Admin/CreateTeam";
import CreateGroup from "../pages/Admin/CreateGroup";
import CreateMatch from "../pages/Admin/CreateMatch";
import AdminViewMatches from "../pages/Admin/AdminViewMatches";
import Result from "../pages/MainApp/Result";

export default function AppRoutes() {
  let { user } = useContext(AuthContext);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Home />} />

        <Route path="/admin/createplayer" element={<CreatePlayer />} />
        <Route path="/admin/createteam" element={<CreateTeam />} />
        <Route path="/admin/creategroup" element={<CreateGroup />} />
        <Route path="/admin/creatematch" element={<CreateMatch />} />
        <Route path="/admin/view-matches" element={<AdminViewMatches />} />

        {/*<Route path="/Search" element={<Search />} />
        <Route path="/books/:id" element={<BookDetails />} /> */}
        {/* <Route path="/about" element={<About />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogsDetails />} />
        <Route path="*" element={<NotFound />} /> */}
        {/* <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Layout>
  );
}
