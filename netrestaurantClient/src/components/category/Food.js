import React, { useEffect, useState } from "react";
import kakaoMapApi from "../../util/kakaoMapApi";
import { CATEGORY, KAKO_DOCUMENT_ID } from "../../util/location";
import MapContainer from "./Food/MapContainer";
import FoodList from "./Food/FoodList";
import styled from "styled-components";

const Food = () => {
  return (
    <div>
      <MapContainer category={CATEGORY.food} />
    </div>
  );
};

export default Food;

const FoodContainer = styled.div`
  display: flex;
`;
