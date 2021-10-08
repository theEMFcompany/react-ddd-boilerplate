import React, {useState} from 'react';
import {AddButton} from '../AddButton';
import {Form, InsertData as _InsertData} from './Form';


interface InsertProps {
  isMuted?: boolean;
  fullKey: string[];
  onAddField(data: InsertData): void;
  onDropField(fullKey: string[]): void;
}

export type InsertData = _InsertData;
export const InsertForm = Form;
export function InsertBlock(props: InsertProps) {
  type InsertState = 'FIELD_DETAILS' | 'INSERT_TYPES' | 'CLICK_TO_INSERT';
  type InsertType = 'FIELD' | null;
  const [insertType, setInsertType] = useState<InsertType>(null);
  const [insertState, setInsertState] = useState<InsertState>(props.isMuted ? 'CLICK_TO_INSERT' : 'INSERT_TYPES');
  const [isDraggingOver, setDraggingOver] = useState<boolean>(false);

  const insertActions = <div className='fieldSchemaEditor__insertBlock__insertActions'>
    <AddButton
      text='Add new field'
      onClick={() => {
        setInsertType('FIELD');
        setInsertState('FIELD_DETAILS');
      }}/>
  </div>;

  return {
    'FIELD_DETAILS': (
      <Form
        fullKey={[...props.fullKey, 'new']}
        onInsert={data => {
          props.onAddField(data);
          setInsertState(props.isMuted ? 'CLICK_TO_INSERT' : 'INSERT_TYPES');
        }}
        onDiscard={() => {
          setInsertType(null);
          setInsertState(props.isMuted ? 'CLICK_TO_INSERT' : 'INSERT_TYPES');
        }}/>
    ),
    'INSERT_TYPES': (
      <div
        className={`fieldSchemaEditor__insertBlock ${isDraggingOver ? 'fieldSchemaEditor__insertBlock--isDraggingOver' : ''}`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragExit}
        onDrop={handleDrop}>
        {insertActions}
      </div>
    ),
    'CLICK_TO_INSERT': (
      <div
        className={`fieldSchemaEditor__insertBlock fieldSchemaEditor__insertBlock--muted ${isDraggingOver ? 'fieldSchemaEditor__insertBlock--isDraggingOver' : ''}`}
        onDragOver={handleDragOver}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragExit}
        onDrop={handleDrop}>
        {insertActions}
      </div>
    )
  }[insertState];
  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
  }
  function handleDragEnter(e: React.DragEvent) {
    e.preventDefault();
    setDraggingOver(true);
  }
  function handleDragExit(e: React.DragEvent) {
    e.preventDefault();
    setDraggingOver(false);
  }
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDraggingOver(false);
    const keyString = e.dataTransfer.getData('fullKey');
    props.onDropField(keyString.split(':'))
  }
}
