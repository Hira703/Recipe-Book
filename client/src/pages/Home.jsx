import React from "react";

import RecipeBanner from "./home/RecipeBanner";

import TopLikedRecipes from "../components/TopLiked";

import TestimonialsAndBlog from "./home/TestimonialsAndBlog";
import Quiz from "./home/Quiz";

import MeetOurChefs from "./home/MeetOurChefs";

const Home = () => {
    return (
        <div>
            <RecipeBanner></RecipeBanner>
            <TopLikedRecipes></TopLikedRecipes>
            <TestimonialsAndBlog></TestimonialsAndBlog>
            <Quiz></Quiz>
            <MeetOurChefs></MeetOurChefs>
        </div>
    );
};

export default Home;
