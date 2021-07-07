import React from "react";
import Splits from "../components/Splits";
import { isLoggedIn } from "../utils/auth";

export default function SplitsPage() {
  isLoggedIn();

  return <Splits></Splits>;
}
