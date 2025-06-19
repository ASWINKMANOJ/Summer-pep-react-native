import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Keyboard,
    Dimensions,
} from "react-native";
import { useState } from "react";
import TodoItem from "../components/TodoItem";
import { FlatList } from "react-native-gesture-handler";

const { width } = Dimensions.get("screen");

const TodoList = () => {
    const [todo, setTodo] = useState("");
    const [todoList, setTodoList] = useState([
        { id: 1, name: "Finish math homework", isCompleted: false },
        { id: 2, name: "Go for a walk", isCompleted: false },
        { id: 3, name: "Buy groceries", isCompleted: false },
        { id: 4, name: "Clean the room", isCompleted: false },
        { id: 5, name: "Watch a tutorial on React Native", isCompleted: false },
        { id: 6, name: "Prepare for tomorrow’s class", isCompleted: false },
        { id: 7, name: "Meditate for 10 minutes", isCompleted: false },
        { id: 8, name: "Call mom", isCompleted: true },
        { id: 9, name: "Submit assignment", isCompleted: true },
        { id: 10, name: "Read 10 pages of a book", isCompleted: true },
    ]);

    const handleTodo = () => {
        if (todo.trim() === "") return;
        setTodoList([
            { id: Date.now(), name: todo, isCompleted: false },
            ...todoList,
        ]);
        setTodo("");
        Keyboard.dismiss();
    };

    const toggleComplete = (index) => {
        const updatedList = [...todoList];
        const toggledItem = { ...updatedList[index] };
        toggledItem.isCompleted = !toggledItem.isCompleted;
        updatedList.splice(index, 1);

        if (toggledItem.isCompleted) {
            const insertIndex = updatedList.findIndex(
                (todo) => todo.isCompleted
            );
            if (insertIndex === -1) {
                updatedList.push(toggledItem);
            } else {
                updatedList.splice(insertIndex, 0, toggledItem);
            }
        } else {
            updatedList.unshift(toggledItem);
        }

        setTodoList(updatedList);
    };

    return (
        <View style={styles.container}>
            <View style={styles.todoContainer}>
                <TextInput
                    value={todo}
                    onChangeText={setTodo}
                    placeholder="Add a new task..."
                    style={styles.textInput}
                    returnKeyType="send"
                    onSubmitEditing={handleTodo}
                    blurOnSubmit={true}
                />
                <TouchableOpacity
                    style={styles.todoButton}
                    onPress={handleTodo}
                >
                    <Text style={styles.todoButtonText}>Add</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={todoList}
                renderItem={({ item, index }) => (
                    <TodoItem
                        todo={item.name}
                        isCompleted={item.isCompleted}
                        onToggle={() => toggleComplete(index)}
                    />
                )}
                style={[styles.todoListContainer, { width }]}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    todoContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 8,
        paddingVertical: 12,
        borderBottomColor: "#000",
        borderBottomWidth: 2,
    },
    textInput: {
        width: "70%",
        padding: 12,
        borderColor: "#333446",
        borderWidth: 2,
        borderRadius: 12,
    },
    todoButton: {
        backgroundColor: "#B8CFCE",
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    todoButtonText: {
        fontWeight: "bold",
    },
    todoListContainer: {
        flex: 1,
        flexGrow: 4,
        paddingHorizontal: 12,
        paddingVertical: 8,
        marginVertical: 16,
    },
});

export default TodoList;
