/*

import React from "react";
// CSV download
import { CSVLink } from "react-csv";
import { Button } from '@material-ui/core';
import { useSelector } from 'react-redux';


export default function DownloadCsvFile(props) {

  const { type, setOpenModalExport } = props;
  const items = useSelector(state => state[type].items);
  const headerVariables = useSelector(state => state[type].headerVariables);

  const buildDataCsv = () => {
    let csvData = [];
    let tempArr = [];
    if(type === 'events' && items.length !== 0){
      headerVariables.map(value => {
        if(value.id === 'actions') 
          return null;
        tempArr.push(value.id);
        return null;
      });
      csvData.push(tempArr);
      tempArr = [];
      items.map((item) => {
        headerVariables.map(value => {
          if(value.id === 'actions') 
            return null;
          tempArr.push(item[value.id]);
          return null;
        });
        csvData.push(tempArr);
        tempArr = [];
        return null;
      })
      return csvData;
      // for (const [key] of Object.entries(items[0])) {
      //   tempArr.push(key);
      // }
      // csvData.push(tempArr);
      // tempArr = [];
      // items.map((item) => {
      //   for (const [key] of Object.entries(item)) {
      //     tempArr.push(item[key]);
      //   }
      //   csvData.push(tempArr);
      //   tempArr = [];
      //   return null;
      // })
      // return csvData;
    }
    else if(type === 'settlementBatch' && items.length !== 0){
      headerVariables.map(value => {
        if(value.id === 'actions') 
          return null;
        tempArr.push(value.id);
        return null;
      });
      csvData.push(tempArr);
      tempArr = [];
      items.map((item) => {
        headerVariables.map(value => {
          if(value.id === 'actions') 
            return null;
          tempArr.push(item[value.id]);
          return null;
        });
        csvData.push(tempArr);
        tempArr = [];
        return null;
      })
      return csvData;
    }
    else if(type === 'trade' && items.length !== 0){
      headerVariables.map(value => {
        if(value.id === 'actions') 
          return null;
        tempArr.push(value.id);
        return null;
      });
      csvData.push(tempArr);
      tempArr = [];
      items.map((item) => {
        headerVariables.map(value => {
          if(value.id === 'actions') 
            return null;
          tempArr.push(item[value.id]);
          return null;
        });
        csvData.push(tempArr);
        tempArr = [];
        return null;
      })
      return csvData;
      // for (const [key] of Object.entries(items[0])) {
      //   tempArr.push(key);
      // }
      // csvData.push(tempArr);
      // tempArr = [];
      // items.map((item) => {
      //   for (const [key] of Object.entries(item)) {
      //     tempArr.push(item[key]);
      //   }
      //   csvData.push(tempArr);
      //   tempArr = [];
      //   return null;
      // })
      // return csvData;
    }
    else if(type === 'balanceMatrix' && items.length !== 0){
      let header = [];
      header.push('COUNTERPARTY');
      for (const [key_item] of Object.entries(items)) {
        for (const [key] of Object.entries(items[key_item])){
          header.push(key);
        }
      }
      header = [...new Set(header)];
      csvData.push(header.map(value => value.toUpperCase()));
      for (const [key_item] of Object.entries(items)) {
        // eslint-disable-next-line no-loop-func
        header.map(value => {
          if(value === 'COUNTERPARTY'){
            tempArr.push(key_item);
          }
          else if(value === 'last_calculation_date'){
            tempArr.push(items[key_item][value]);
          }
          else {
            tempArr.push(items[key_item][value] !== undefined? items[key_item][value].toString().toLocaleString('en-GB'): '');
          }
          return null;
        });
        csvData.push(tempArr);
        tempArr = [];
      }
    }
    return csvData;
  }
    
  const renderButton = () => {
    return (
      <Button onClick={() => {setOpenModalExport(false)}} disabled={items.length === 0} style={{width:'150px', color:'white'}} variant="contained" color="primary">
        <CSVLink filename={type.toUpperCase()+".csv"} style={{color:'white'}} data={buildDataCsv()}>CSV Download</CSVLink>
      </Button>
    )
  }

  return renderButton();
}

*/