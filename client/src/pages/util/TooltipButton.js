import React from 'react';
import {  Tooltip, Button } from "@material-ui/core";

export default function TooltipButton(props) {
    return (
        <div className={"tooltip-button "+ props.conatinerClassName}>
            <Tooltip title = {props.tooltip} placement={props.placement}>
                <Button className={props.buttonClassName} variant={props.variant} color={props.color} onClick={props.onClick}>
                    {props.children}
                </Button>
            </Tooltip>
        </div>
    )
}
