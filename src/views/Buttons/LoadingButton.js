import React, { Component } from 'react';
import { Button } from 'reactstrap';
import BeatLoader from "react-spinners/BeatLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default props => {

  return <Button
    disabled={props.isLoading}
    onClick={props.onClick}
    color={props.color ? props.color : "primary"}
    className={props.className ? props.className : "px-4"}
    block={props.block ? props.block : false}
    type={props.type ? props.type : "button"}
  >
    {
      props.isLoading
        ?
        < BeatLoader
          css={override}
          size={props.size ? props.size : 7}
          margin={props.margin ? props.margin : 2}
          color={"#FFFFFF"}
          loading={props.isLoading}
        />
        :
        <div>
          {
            props.iconClassName
              ? <i className={props.iconClassName} style={{ marginRight: 5 }}></i>
              : <></>
          }
          {props.text}
        </div>
    }
  </Button>

}

