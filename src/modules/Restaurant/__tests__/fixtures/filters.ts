import * as T from 'modules/Restaurant/types';
const filters: T.Filter[] = [{
  "key": "key",
  "label": "Restaurants name",
  "type": "string",
  "values": [],
  "ui_widget": "search"
},{
  "key": "address",
  "label": "Address",
  "type": "string",
  "values": [],
  "ui_widget": "search"
},{
  "key": "avg_cost",
  "label": "Average Cost for Couple",
  "type": "range",
  "ui_widget": "range_slider",
  "items": [{
    "key": "avg_cost_min",
    "label": "From",
    "type": "number",
    "values": [],
  },{
    "key": "avg_cost_max",
    "label": "To",
    "type": "number",
    "values": [],
  }]
},{
  "key": "currency",
  "label": "Currency",
  "type": "string",
  "ui_widget": "select",
  "values": []
},{
  "key": "has_booking",
  "label": "Has Booking",
  "type": "boolean",
  "ui_widget": "toggle"
},{
  "key": "has_delivery",
  "label": "Has Delivery",
  "type": "boolean",
  "ui_widget": "toggle"
},{
  "key": "price",
  "label": "Price",
  "type": "range",
  "ui_widget": "range_slider",
  "items": [{
    "key": "price_min",
    "label": "From",
    "type": "number",
    "values": [],
  },{
    "key": "price_max",
    "label": "To",
    "type": "number",
    "values": [],
  }]
},{
  "key": "rating",
  "label": "Rating",
  "type": "range",
  "ui_widget": "range_slider",
  "items": [{
    "key": "rating_min",
    "label": "From",
    "type": "number",
    "values": [],
  },{
    "key": "rating_max",
    "label": "To",
    "type": "number",
    "values": [],
  }]
},{
  "key": "votes",
  "label": "Minimum Number of Votes",
  "type": "range",
  "ui_widget": "range_slider",
  "items": [{
    "key": "votes",
    "label": "From",
    "type": "number",
    "values": [],
  },{
    "key": "votes_max",
    "label": "To",
    "type": "number",
    "values": [],
    "ui_disabled": true,
    "ui_constraints": ["exclude_value"]
  }]
},{
  "key": "country",
  "label": "Country",
  "type": "string",
  "ui_widget": "select",
  "values": []
},{
  "key": "city",
  "label": "City",
  "type": "string",
  "ui_widget": "select",
  "values": []
},{
  "key": "locality",
  "label": "Locality",
  "type": "string",
  "ui_widget": "select",
  "values": []
},{
  "key": "cuisines",
  "label": "Cuisines",
  "type": "string",
  "ui_widget": "multi_select",
  "values": []
}];

export default filters;
