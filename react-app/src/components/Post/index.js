import { useEffect, useState, useRef } from "react";
import { useParams, useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { findFollowers, followUser } from "../../store/follow";
import { getPostFollowing, postDetails, likePost, } from "../../store/post";
