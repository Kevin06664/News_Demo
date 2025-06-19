import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const DATA = [
  { id: '1', title: 'Task 1', priority: 'high' },
  { id: '2', title: 'Task 2', priority: 'medium' },
  { id: '3', title: 'Task 3', priority: 'low' },
  { id: '4', title: 'Task 4', priority: 'high' },
  { id: '5', title: 'Task 5', priority: 'medium' },
  { id: '6', title: 'Task 6', priority: 'low' },
  { id: '7', title: 'Task 7', priority: 'high' },
  { id: '8', title: 'Task 8', priority: 'medium' },
  { id: '9', title: 'Task 9', priority: 'low' },
  { id: '10', title: 'Task 10', priority: 'high' },
  { id: '11', title: 'Task 11', priority: 'low' },
  { id: '12', title: 'Task 12', priority: 'medium' },
  { id: '13', title: 'Task 13', priority: 'high' },
  { id: '14', title: 'Task 14', priority: 'low' },
  { id: '15', title: 'Task 15', priority: 'medium' },
  { id: '16', title: 'Task 16', priority: 'high' },
  { id: '17', title: 'Task 17', priority: 'medium' },
  { id: '18', title: 'Task 18', priority: 'low' },
  { id: '19', title: 'Task 19', priority: 'high' },
  { id: '20', title: 'Task 20', priority: 'medium' },
];

const priorityLevels = ['high', 'medium', 'low']; 

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case 'high':
      return 'red';
    case 'medium':
      return 'green';
    case 'low':
      return 'blue';
    default:
      return 'gray';
  }
};

const ListScreen = () => {
  const sortedData = [...DATA].sort(
    (a, b) => priorityLevels.indexOf(a.priority) - priorityLevels.indexOf(b.priority)
  );

  const renderItem = ({ item }: { item: { id: string; title: string; priority: string } }) => (
    <View style={[styles.item, { backgroundColor: getPriorityColor(item.priority) }]}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.priority}>Priority: {item.priority.toUpperCase()}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={sortedData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
  },
  item: {
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  priority: {
    fontSize: 14,
    color: '#fff',
    marginTop: 4,
  },
});

export default ListScreen;
