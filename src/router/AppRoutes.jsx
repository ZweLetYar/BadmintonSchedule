import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import LogIn from "../pages/UserIntroduction/LogIn";
import Register from "../pages/UserIntroduction/Register";
import Naming from "../pages/UserIntroduction/Naming";
import Layout from "../Layout/Layout";
import PeriodLength from "../pages/UserIntroduction/PeriodLength";
import CircleLength from "../pages/UserIntroduction/CircleLength";

import RegularOrNot from "../pages/UserIntroduction/RegularOrNot";
import Discomfort from "../pages/UserIntroduction/Discomfort";
import LastPeriodDate from "../pages/UserIntroduction/LastPeriodDate";
import ReproductiveDisorder from "../pages/UserIntroduction/ReproductiveDisorder";
import AboutSleep from "../pages/UserIntroduction/AboutSleep";
import Home from "../pages/MainApp/Home";
import { AuthContext } from "../Context/AuthContext";
import LogPeriodForm from "../pages/MainApp/LogPeriodForm";
import Symptoms from "../pages/MainApp/Symptoms";
import LogSymptoms from "../pages/MainApp/LogSymptoms";
import PeriodCalendar from "../pages/MainApp/PeriodCalender";
import BlogDetail from "../pages/MainApp/BlogDetail";
import DailyNotes from "../pages/MainApp/DailyNotes";
import BlogList from "../Components/BlogList";
import CreatePlayer from "../pages/MainApp/CreatePlayer";
import CreateTeam from "../pages/MainApp/CreateTeam";
import CreateGroup from "../pages/MainApp/CreateGroup";
import CreateMatch from "../pages/MainApp/CreateMatch";
import AdminViewMatches from "../pages/MainApp/AdminViewMatches";

export default function AppRoutes() {
  let { user } = useContext(AuthContext);
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/createplayer" element={<CreatePlayer />} />
        <Route path="/createteam" element={<CreateTeam />} />
        <Route path="/creategroup" element={<CreateGroup />} />
        <Route path="/creatematch" element={<CreateMatch />} />
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
