import React, { Component } from 'react';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default props => {

  return <div style={{ position: 'absolute', left: '50%' }}>
    < BeatLoader
      css={override}
      size={props.size ? props.size : 7}
      margin={props.margin ? props.margin : 2}
      color={"#111111"}
      loading={props.isLoading}
    />
  </div>

}

