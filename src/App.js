import React, { useState, useRef, useEffect, Fragment } from "react";
import axios from "axios";

import { MDBContainer, MDBListGroup, MDBListGroupItem, MDBBtn } from "mdbreact";

const App = () => {
  const [userCredentials, setUserCredentials] = useState([]);
  const [pagination, setPagination] = useState([]);
  const [skip, setSkip] = useState(3);
  const [dataLength, setdataLength] = useState(null);
  const handleSubmit = async (e) => {
    try {
      const limit = 3;
      const { data } = await axios.get(
        `http://localhost:8080/pagination?skip=${skip}&limit=${limit}`
      );
      setdataLength(data.length);
      setPagination([...pagination, ...data]);
      setSkip(skip + limit);
      return data;
    } catch (error) {
      //message, config, code, request, response response.data
      console.log(error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("http://localhost:8080/");
        setUserCredentials(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return (
    <MDBContainer>
      <MDBListGroup style={{ width: "22rem" }}>
        {userCredentials
          ? Object.values(userCredentials).map((items) => {
              return (
                <MDBListGroupItem key={items._id}>
                  {items.company}
                </MDBListGroupItem>
              );
            })
          : null}

        {pagination.map((items) => {
          return (
            <MDBListGroupItem key={items._id}>{items.company}</MDBListGroupItem>
          );
        })}
      </MDBListGroup>

      <Fragment>
        {dataLength !== 0 ? (
          <MDBBtn color="danger" onClick={() => handleSubmit()}>
            Load more...
          </MDBBtn>
        ) : null}
      </Fragment>
    </MDBContainer>
  );
};

export { App };
