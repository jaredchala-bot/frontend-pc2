import { useState } from "react";
import type { ChangeEvent, SubmitEvent } from "react";
import { useParams } from "react-router-dom";
import { api, apiError, useFetch } from "./api";
import { Alert, Field } from "./components/ui";


export const LISTA_PATH = "/dashboard";
export const DETAIL_PATH = "dashboard";
export const MY_PATH = "dashboard";
export const API_RESOURCE = "dashboard";
export const API_MY_OPERATIONS = "mentors";
export const TITLE = "  MentoriaUTEC";

export type Item = {
    {/* ... */}
}