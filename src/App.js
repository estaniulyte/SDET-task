import React, { useEffect, useState } from 'react';
import axios from 'axios';
import XMLParser from 'react-xml-parser';
import { BrowserRouter } from 'react-router-dom';
import Header from 'components/Header';

function App() {
  var _ = require('lodash');

  const [data, setData] = useState('');
  const [tests, setTests] = useState();

  let Tests = [];

  const getData = async (link) => {
    const { data } = await axios.get(link);
    setData(data);
  };

  useEffect(() => {
    const link = `https://estaniulyte.github.io/Data/SDET-tests-results/results1.xml`;
    getData(link);
    const jsonData = new XMLParser().parseFromString(data, 'text/xml');
    if (jsonData) {
      Tests.push(structureData(jsonData));
      setTests(Tests);
    }
  }, [data]);

  const structureData = (data) => {
    const { children } = data;

    const { attributes, children: tests } = children[0];

    const [, ...testsResults] = tests[1].children[1].children;
    var result = Object.values(testsResults);
    var result1 = Object.values(result);

    const resulte = _.pick(
      attributes,
      'id',
      'name',
      'result',
      'start-time',
      'duration',
      'end-time',
      'failed',
      'passed',
      'total',
      'testcasecount'
    );
    Object.assign(resulte, { testResults: result1 });

    return resulte;
  };
  return (
    // <BrowserRouter> for local development
    <BrowserRouter basename="/SDET-task">
      <div className="App">
        <Header />
        <div className="content">
          {tests?.map((test) => (
            <div key={test.id} className="card">
              <div className="title">
                <h3>
                  <span className="normal-text">ID: {test.id} </span>
                  &nbsp;|&nbsp;&nbsp;
                  {test.name}
                </h3>
                <span>
                  <b>Result: {test.result}</b>&nbsp;|&nbsp;
                  {test['start-time'].split(' ')[0]}
                </span>
              </div>
              <div className="data-content">
                <table>
                  <tbody>
                    <tr>
                      <th className="bold-text">ID</th>
                      <th className="bold-text">Test Name</th>
                      <th className="bold-text">Duration</th>
                      <th className="bold-text">Result</th>
                    </tr>
                    {test.testResults?.map((testCase) => (
                      <tr key={testCase.attributes.id}>
                        <th>{testCase.attributes.id}</th>
                        <th>{testCase.attributes.name}</th>
                        <th>{testCase.attributes.duration}</th>
                        <th className="positive-result bold-text">
                          {testCase.attributes.result}
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
