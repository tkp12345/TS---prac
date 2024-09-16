import React, { useState } from "react";
import Iframe from "react-iframe";
import styled from "styled-components";
import Modal from "react-modal";

const FoodList = ({ place, setPlace, list }) => {
  console.log(place);
  console.log(list);

  const [like, setLike] = useState([]);
  const [unlike, setUnLike] = useState([]);

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  // function afterOpenModal() {
  //   // references are now sync'd and can be accessed.
  //   // subtitle.style.color = '#f00';
  // }

  function closeModal() {
    setIsOpen(false);
  }

  const customStyles = {
    content: {
      // top: "50%",
      // left: "50%",
      // right: "auto",
      // bottom: "auto",
      // marginRight: "-50%",
      // transform: "translate(-50%, -50%)",
    },
    overlay: { zIndex: 1000 },
  };

  return (
    <Container>
      {list.length !== 0 && (
        <Ul>
          {list.map((v, index) => {
            return (
              <Li key={index} onClick={() => setPlace(v)}>
                <span>{v.place_name}</span>
                <div>
                  <ModalButton onClick={openModal}>👀</ModalButton>
                  <LikeButton
                    includes={like.includes(v.id)}
                    onClick={() => {
                      setLike((prev) =>
                        !prev.includes(v.id)
                          ? [...prev, v.id]
                          : prev.filter((item) => item !== v.id),
                      );

                      unlike.includes(v.id) &&
                        setUnLike((prev) =>
                          prev.filter((item) => item !== v.id),
                        );
                    }}
                  >
                    👍 like
                  </LikeButton>{" "}
                  <UnLikeButton
                    includes={unlike.includes(v.id)}
                    onClick={() => {
                      setUnLike((prev) =>
                        !prev.includes(v.id)
                          ? [...prev, v.id]
                          : prev.filter((item) => item !== v.id),
                      );
                      like.includes(v.id) &&
                        setLike((prev) => prev.filter((item) => item !== v.id));
                    }}
                  >
                    👎 unlike
                  </UnLikeButton>
                </div>
              </Li>
            );
          })}
        </Ul>
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <ButtonContainer>
          <ModalButton onClick={closeModal}>❌</ModalButton>
        </ButtonContainer>
        <Iframe
          url={place?.place_url}
          width="100%"
          height="100%"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal>
      {/* {place && (
        <PlaceContainer>
          <div>{place.address_name}</div>
          <div>{place.category_name}</div>
          <div>{place.place_name}</div>
          <div>{place.phone}</div>
          <div>{place.road_address_name}</div>
        </PlaceContainer> */}
      {/* )} */}
    </Container>
  );
};

export default FoodList;

const Container = styled.div`
  width: 100%;
  display: flex;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Ul = styled.ul`
  padding: 0;
  width: 100%;
  margin: 0px 10px;
`;
const Li = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px;
  margin-bottom: 8px;
  background: white;
  border-radius: 4px;
  cursor: pointer;
`;

const Button = styled.button`
  border-radius: 4px;
  padding: 2px 6px;
  margin: 2px;
  border: none;
  color: white;
  cursor: pointer;
`;

const ModalButton = styled(Button)`
  background: transparent;
`;

const LikeButton = styled(Button)`
  background: ${(props) => (props.includes ? "#3392ff" : "#b2d8fb")};
`;

const UnLikeButton = styled(Button)`
  background: ${(props) => (props.includes ? "#ff4533" : "#fbbab2")};
`;

const PlaceContainer = styled.div``;
