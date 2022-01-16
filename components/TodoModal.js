import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  Button,
  TouchableWithoutFeedback,
} from 'react-native';

export const TodoModal_Modes = {
  NEW: 'NEW',
  EDITING: 'EDITING',
};

export function TodoModal({
  todo,
  todoId,
  onCreate,
  isOpen,
  onEdit,
  mode,
  closeModal,
}) {
  const [todo_modal, set_todo_modal] = React.useState({
    title: '',
    content: '',
  });

  function updateField(field, value) {
    set_todo_modal({ ...todo_modal, [`${field}`]: value });
  }

  React.useEffect(() => {
    set_todo_modal({
      title: mode === TodoModal_Modes.EDITING ? todo['title'] : '',
      content: mode === TodoModal_Modes.EDITING ? todo['content'] : '',
    });
  }, [mode, todo]);

  return (
    <>
      {isOpen && (
        <TouchableWithoutFeedback
          // onPress={closeModal}
          onStartShouldSetResponder={(event) => true}
          onTouchEnd={(e) => {
            e.stopPropagation();
          }}>
          <View style={_x.todo_modal}>
            <View style={_x.hover_box}>
              <TextInput
                value={todo_modal.title}
                onChangeText={(txt) => updateField('title', txt)}
                placeholder="title"
                style={[_x.col1, _x.search]}
                textAlignVertical={'top'}
                multiline={true}
                placeholderTextColor="#000"
              />

              <TextInput
                value={todo_modal.content}
                onChangeText={(txt) => updateField('content', txt)}
                placeholder="content"
                textAlignVertical={'top'}
                style={[_x.col2, _x.search]}
                multiline={true}
                placeholderTextColor="#000"
              />

              <View style={_x.col3}>
                <Button
                  title={mode === TodoModal_Modes.NEW ? 'create' : 'edit'}
                  onPress={() => {
                    set_todo_modal({
                      ...set_todo_modal,
                      title: '',
                      content: '',
                    });

                    todo_modal.title !== '' && todo_modal.title !== ''
                      ? mode === TodoModal_Modes.NEW
                        ? onCreate(todo_modal)
                        : onEdit(todoId, todo_modal)
                      : null;
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
    </>
  );
}

const _x = StyleSheet.create({
  todo_modal: {
    padding: 10,
    borderRadius: 10,
    height: '100%',
    position: 'absolute',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hover_box: {
    height: 200,
    width: '80%',
    backgroundColor: '#383E45',
  },
  search: {
    color: 'white',
  },
  col1: {
    height: 50,
    padding: 10,
  },
  col2: {
    padding: 10,
    flex: 1,
  },
});
