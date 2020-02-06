import React from "react";
import { Alert } from "@material-ui/lab";
import { Button, Container } from "@material-ui/core";

export default function CustomAlert(props) {
    return (
        <Container maxWidth="sm">
            <Alert className={props.alertClassName + " alert-message"} severity={props.severity}>
                {props.message}
            </Alert>
            {props.buttonText ? (
                <Button
                    className={props.buttonClassName}
                    onClick={props.buttonClickHandler}
                    variant="contained"
                    color="secondary"
                >
                    {props.buttonText}
                </Button>
            ) : (
                ""
            )}
        </Container>
    );
}
