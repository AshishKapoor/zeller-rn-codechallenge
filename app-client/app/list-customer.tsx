import { RefreshControl, Text, StyleSheet } from "react-native";
import React, { useState } from "react";
import { ScrollView, RadioGroup, Separator, YStack } from "tamagui";
import RadioGroupItemWithLabel from "../components/radio-group-item-with-label";
import { useQuery } from "@apollo/client";
import DisplayCustomers from "../components/display-customers";
import { LIST_ZELLER_CUSTOMERS } from "../query-services/list-customers";
import LoadingSpinner from "../components/spinner";

export default function CustomersScreen() {
  const [userType, setUserType] = useState("Admin");

  const { data, loading, refetch } = useQuery(LIST_ZELLER_CUSTOMERS, {
    variables: {
      filter: {
        role: {
          eq: userType,
        },
      },
    },
  });

  const filteredCustomers = data?.listZellerCustomers?.items;

  if (loading) return <LoadingSpinner />;

  const renderUserTypeOptions = () => (
    <RadioGroup
      aria-labelledby="Select one item"
      defaultValue={userType}
      name="form"
      onValueChange={(value: string) => setUserType(value)}
    >
      <YStack width={300} alignItems="center" space="$2">
        <RadioGroupItemWithLabel size="$3" value="Admin" label="Admin" />
        <RadioGroupItemWithLabel size="$3" value="Manager" label="Manager" />
      </YStack>
    </RadioGroup>
  );

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={refetch} />
      }
    >
      <YStack
        width="100%"
        maxWidth={300}
        marginHorizontal={30}
        marginVertical={20}
      >
        <Text style={styles.title}>User Types</Text>
        {renderUserTypeOptions()}
        <Separator marginVertical={20} />
        <Text style={styles.title}>{userType} Users</Text>
        <DisplayCustomers customers={filteredCustomers} />
        <Separator marginVertical={1} />
      </YStack>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
