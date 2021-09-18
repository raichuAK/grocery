import { groceries } from '../groceries';

export async function searchGrocery(gorceryName: string) {
  const groceryList: Array<Grocery> = await Promise.resolve(groceries);
  const searchResult = groceryList.filter((grocery: Grocery) =>
    grocery.name.toLowerCase().includes(gorceryName.toLowerCase()),
  );
  return searchResult;
}
