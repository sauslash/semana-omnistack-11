import React, { useState } from 'react';

import { useHistory } from 'react-router-dom';
import { Modal } from '@material-ui/core';

import { ModalStyle } from './styles';
import { useEffect } from 'react';

export default function ModalOk({ data }) {
  const [open, setOpen] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (data.open) setOpen(true);
    if (data.error) console.log(data.error);
  }, [data]);

  var actions = {
    handleClose: () => setOpen(false),
    handleHome: () => history.push('/'),
  };

  function handle() {
    actions[data.action].call();
  }

  function createMarkup(value) {
    return {
      __html: value,
    };
  }

  const view = (
    <ModalStyle>
      <h2>{data.title}</h2>
      <p dangerouslySetInnerHTML={createMarkup(data.info)}></p>
      <button className="button" type="button" onClick={() => handle()}>
        OK
      </button>
    </ModalStyle>
  );

  return (
    <>
      <Modal open={open} onClose={actions.handleClose}>
        {view}
      </Modal>
    </>
  );
}
