import React, { useState } from 'react';
import { List } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import { MONTHS } from '../../utils/constants';
import { theme } from '../../../theme';
import ExpenseSummaryModal from '../../modals/ExpenseSummary';
import IncomeSummaryModal from '../../modals/IncomeSummary';
import ItemSummary from '../../modals/ItemSummary';

const RightSwipe = () => {
  return (
    <View style={styles.swipeBackground}>
      <Text style={styles.swipeText}>Delete</Text>
    </View>
  );
};

const ListInputComponent = ({ obj, type }) => {
  // const [expenseSummaryModal, setExpenseSummaryModal] = useState(false);
  // const [incomeSummaryModal, setIncomeSummaryModal] = useState(false);
  const [itemSummaryModal, setItemSummaryModal] = useState(false);

  const negative = type === 'Expenses' ? '-' : '';
  const userCategoriesExpenses = ['Food', 'Housing', 'Fun', 'Other', 'School'];
  const userCategoriesIncomes = ['Main job', 'Part-time', 'Passive', 'Other'];

  return (
    <>
      <List.Item
        title={<Text style={styles.subheader}>{obj.name}</Text>}
        // onPress={() => {
        //   type === "Expenses" ? setExpenseSummaryModal(true) : setIncomeSummaryModal(true)
        // }}
        onPress={() => {
          setItemSummaryModal(true);
        }}
        description={
          <View>
            <Text style={styles.text}>{obj.category}</Text>
            <Text style={styles.text}>
              {MONTHS[obj.date.getMonth()]} {obj.date.getDate()}, {obj.date.getFullYear()}
            </Text>
          </View>
        }
        right={() => (
          <View>
            <Text />
            <Text style={styles.price}>
              {negative}${obj.price} {obj.currency}
            </Text>
          </View>
        )}
        style={styles.listItem}
      />
      {/* {expenseSummaryModal && (
        <ExpenseSummaryModal
          modalVisible={expenseSummaryModal}
          setModalVisible={setExpenseSummaryModal}
          expenseData={obj}
          userCategories={userCategoriesExpenses}
        />
      )}

      {incomeSummaryModal && (
        <IncomeSummaryModal
          modalVisible={incomeSummaryModal}
          setModalVisible={setIncomeSummaryModal}
          incomeData={obj}
          userCategories={userCategoriesIncomes}
        />
      )} */}

      {itemSummaryModal && (
        <ItemSummary
          modalVisible={itemSummaryModal}
          setModalVisible={setItemSummaryModal}
          data={obj}
          userCategories={type === 'Expenses' ? userCategoriesExpenses : userCategoriesIncomes}
          type={type}
        />
      )}
    </>
  );
};

const TableComponent = ({ title, subTitle, mult, type }) => {
  const tableItems = mult.map((obj, index) => (
    <Swipeable key={index} renderRightActions={RightSwipe}>
      <ListInputComponent obj={obj} type={type} />
    </Swipeable>
  ));

  return (
    <List.Section style={styles.container}>
      <List.Subheader style={styles.header}>
        {MONTHS[title - 1]} {subTitle}
      </List.Subheader>
      {tableItems}
    </List.Section>
  );
};

export default TableComponent;

const styles = StyleSheet.create({
  container: {
    marginVertical: 0,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.grey,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textLight,
    marginTop: -5,
    marginBottom: -10,
  },
  subheader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textLight,
  },
  text: {
    fontSize: 12,
    color: theme.colors.textLight,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textLight,
    justifyContent: 'space-evenly',
  },
  swipeBackground: {
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'flex-end',
    borderRadius: 10,
    marginVertical: 5,
    marginRight: 15,
  },
  swipeText: {
    color: theme.colors.textLight,
    fontWeight: '600',
    padding: 20,
  },
  listItem: {
    backgroundColor: theme.colors.primary,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 10,
  },
});
