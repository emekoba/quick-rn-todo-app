import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Modal,
  SafeAreaView,
} from 'react-native';
import ListTile from './components/ListTile';
import { TodoModal, TodoModal_Modes } from './components/TodoModal';
import { generateId } from './globals/helpers';
import { FAB } from 'react-native-paper';

export default function App() {
  const [filter, set_filter] = React.useState('');
  const [todo, set_todo] = React.useState({});
  const [todo_modal, set_todo_modal] = React.useState({
    isOpen: false,
    todo: {},
    todoId: '',
    mode: TodoModal_Modes.NEW,
  });

  function createTodo(newTodo) {
    set_todo({ ...todo, [`${generateId()}`]: { ...newTodo, checked: false } });
    closeModal();
  }

  function editTodo(todoId) {
    set_todo_modal({
      ...todo_modal,
      todoId,
      isOpen: true,
      mode: TodoModal_Modes.EDITING,
      todo: {...todo[todoId]},
    });
  }

  function updateTodo(todoId, newTodo) {
    set_todo({ ...todo, [`${todoId}`]: { ...todo[todoId], ...newTodo } });
    closeModal();
  }

  function openModal(mode, id) {
    set_todo_modal({ ...todo_modal, isOpen: true, mode });
  }
  function closeModal() {
    set_todo_modal({ ...todo_modal, isOpen: false });
  }

  function tileTap(id) {
    set_todo({
      ...todo,
      [`${id}`]: { ...todo[id], checked: !todo[id]['checked'] },
    });
  }

  return (
    <View style={_x.app}>
      <SafeAreaView></SafeAreaView>

      <View style={_x.searchbar}>
        <TextInput
          value={filter}
          onChangeText={(txt) => set_filter(txt)}
          placeholder="Search"
          style={_x.search}
        />
      </View>

      <View style={_x.main}>
        {Object.keys(todo)
          .filter(
            (e) =>
              todo[e]['title'].toLowerCase().indexOf(filter.toLowerCase()) !==
              -1
          )
          .map((e) => (
            <ListTile
              key={e}
              id={e}
              title={todo[e]['title']}
              content={todo[e]['content']}
              checked={todo[e]['checked']}
              onLongTap={editTodo}
              onTap={tileTap}
            />
          ))}
      </View>

      <FAB
        style={_x.fab}
        icon="plus"
        onPress={() => openModal(TodoModal_Modes.NEW)}
      />

      <TodoModal
        todo={todo_modal.todo}
        todoId={todo_modal.todoId}
        isOpen={todo_modal.isOpen}
        mode={todo_modal.mode}
        onCreate={createTodo}
        onEdit={updateTodo}
        closeModal={closeModal}
      />
    </View>
  );
}

const _x = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: '#232832',
    position: 'relative',
  },
  searchbar: {
    height: 70,
    width: '100%',
    padding: 10,
    borderBottomWidth: 1,
    backgroundColor: '#383E45',
    paddingTop: 20,
  },
  search: {
    height: '100%',
    padding: 10,
  },
  main: {
    flex: 1,
    marginTop: 20,
    // backgroundColor: 'lightgrey',
    backgroundColor: '#232832',
    padding: 10,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    backgroundColor: '#383E45',
    bottom: 0,
  },
});
