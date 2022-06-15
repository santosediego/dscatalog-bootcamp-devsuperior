import React from 'react';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Control, Controller } from 'react-hook-form';
import { FormState } from './';
import toolbar from './toolbar';

type Props = {
    control: Control<FormState>
}

const DescriptionField = ({ control }: Props) => (
    <Controller
        name='description'
        control={control}
        defaultValue=''
        //'as' quando não precisa manipular o onChange do componente, caso necessário, usar o render;
        render={({ value, onChange }) => (
            <Editor
                //As classes mencionadas não são do DSCatalog;
                toolbarClassName="toolbar-container"
                editorClassName="editor-container"
                editorState={value}
                onEditorStateChange={onChange}
                toolbar={toolbar}
                localization={{
                    locale: 'pt',
                }}
            />
        )}
    />
);

export default DescriptionField;