import {
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup
} from 'modules/common/components';
import { IButtonMutateProps, IFormProps } from 'modules/common/types';
import * as React from 'react';
import { Modal } from 'react-bootstrap';
import { IBoard } from '../types';

type Props = {
  board: IBoard;
  closeModal: () => void;
  renderButton: (props: IButtonMutateProps) => JSX.Element;
  type: string;
};

class BoardForm extends React.Component<Props, {}> {
  generateDoc = (values: { _id?: string; name: string }) => {
    const { board, type } = this.props;
    const finalValues = values;

    if (board) {
      finalValues._id = board._id;
    }

    return {
      _id: finalValues._id,
      name: finalValues.name,
      type
    };
  };

  renderContent = (formProps: IFormProps) => {
    const { board, renderButton, closeModal } = this.props;
    const { values, isSubmitted } = formProps;
    const object = board || { name: '' };

    return (
      <>
        <FormGroup>
          <ControlLabel required={true}>Name</ControlLabel>

          <FormControl
            {...formProps}
            name="name"
            defaultValue={object.name}
            required={true}
          />
        </FormGroup>

        <Modal.Footer>
          <Button
            btnStyle="simple"
            type="button"
            icon="cancel-1"
            onClick={closeModal}
          >
            Cancel
          </Button>

          {renderButton({
            name: 'board',
            values: this.generateDoc(values),
            isSubmitted,
            callback: closeModal,
            object: board
          })}
        </Modal.Footer>
      </>
    );
  };

  render() {
    return <Form renderContent={this.renderContent} />;
  }
}

export default BoardForm;
