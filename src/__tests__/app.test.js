import React from "react";
import {
  APIBaseURI,
  indexTotalIndexedEndpoint,
  dataTotalIndexableEndpoint,
  dataItemsTypeEndpoint,
  indexItemsLanguageEndpoint,
  indexItemsTypeCoverageEndpoint
} from "../constants";
const fetch = require("node-fetch");

beforeAll(() => {
  jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
})

test('test for fetching data from total indexed', async () => {
  const data = await fetch (APIBaseURI+indexTotalIndexedEndpoint);
  const rawData = await data.json();
  expect(typeof rawData).toBe("number")
})

test('test for fetching data from total indexable', async () => {
  const data = await fetch (APIBaseURI+dataTotalIndexableEndpoint);
  const rawData = await data.json();
  expect(typeof rawData).toBe("object")
})

//checks if there are these keys in the object
test('test for fetching data from total indexable', async () => {
  const data = await fetch (APIBaseURI+dataTotalIndexableEndpoint);
  const indexableData = await data.json();
  expect(Object.keys(indexableData)).toEqual(expect.arrayContaining(['indexable', 'indexable_ratio']))
})

test('test for fetching data from items type', async () => {
  const dataType = await fetch (APIBaseURI+dataItemsTypeEndpoint);
  const itemsTypeData = await dataType.json();
  expect( itemsTypeData ).toEqual (
      expect.arrayContaining([
        expect.objectContaining({"type": "text"}),
        expect.objectContaining({"type": "user"}),
        expect.objectContaining({"type": "media"}),
        expect.objectContaining({"type": "other"}),
      ])
  )
})

test('test for fetching data from items Language', async () => {
  const dataType = await fetch (APIBaseURI+indexItemsLanguageEndpoint );
  const  indexItemsTypeLanguage = await dataType.json();
  //  expect(Array.isArray(['percentage'])).toBe(true);
  expect(indexItemsTypeLanguage).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "percentage": expect.any(Number)
        })
      ])
  )
  indexItemsTypeLanguage.forEach(element => {
    console.log('percentage',element.percentage)
    expect(element.percentage).toBeGreaterThan(0);
    expect(element.percentage).toBeLessThan(1)
  });
})
test('test for fetching data from items indexItemsTypeCoverageEndpoint', async () => {
  const dataType = await fetch (APIBaseURI+indexItemsTypeCoverageEndpoint);
  const indexItemsTypeCoverag = await dataType.json();
  expect(Array.isArray(['coverage'])).toBe(true);
  expect(indexItemsTypeCoverag).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          "coverage": expect.any(Number)
        })
      ])
  )
})
