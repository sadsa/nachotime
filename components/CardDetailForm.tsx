import React from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { useForm } from "react-hook-form";

type FormData = {
    firstName: string;
    lastName: string;
};

function CardDetailForm() {
    const { register, handleSubmit } = useForm<FormData>();
    const onSubmit = handleSubmit(({ firstName, lastName }) => {
        console.log(firstName, lastName);
    });
    return (
        <Form onSubmit={onSubmit}>
            <Form.Field>
                <label>First Name</label>
                <input name="firstName" placeholder="First Name" ref={register} />
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <input name="lastName" placeholder="Last Name" ref={register} />
            </Form.Field>
            <Form.Field>
                <Checkbox label="I agree to the Terms and Conditions" />
            </Form.Field>
            <Button type="submit">Submit</Button>
        </Form>
    );
}

export default CardDetailForm;
