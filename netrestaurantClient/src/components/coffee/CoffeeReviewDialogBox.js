import React, {useState, useCallback, useEffect} from 'react';
import styled from 'styled-components';

// '치즈케익 별로... 내마음의 별로',
// '카페인 무슨 일인가요? 새벽 5시에 잠들어서 다음날 상사에게 털림',
// '카페인 과다 섭취로 손이 떨려ㅅㅓ서얼ㄴㅇㅎㅁㄴㅎㅁㄴㄹㅇㅁ',
// '치즈 못먹어서 치즈케익에 치즈 뺴달라 했더니 안판다 함;;',

const CoffeeReviewDialogBox = ({setIsOpened, coffeeData}) => {
	const [review, setReview] = useState('');
	const [reviewList, setReviewList] = useState([]);
	//review textbox의 내용 변화 감지 & update
	const onChangeReview = useCallback((e) => {
		setReview(e.target.value);
	}, []);
	//해당 cafe의 review 추가
	const onSubmitSaveReview = useCallback(
		(e) => {
			e.preventDefault();

			setReviewList((prev) => [review, ...prev]);
			setReview('');

			let reviews =
				JSON.parse(localStorage.getItem('coffeeReviews')) || {};

			if (reviews.hasOwnProperty(coffeeData.id)) {
				reviews[coffeeData.id] = [review, ...reviews[coffeeData.id]];
			} else {
				reviews[coffeeData.id] = [review];
			}

			localStorage.setItem('coffeeReviews', JSON.stringify(reviews));
		},
		[review, coffeeData.id],
	);
	//해당 cafe review dialog box 닫기
	const onClickCloseDialogBox = useCallback(() => {
		setIsOpened(false);
	}, [setIsOpened]);

	useEffect(() => {
		const reviews = JSON.parse(localStorage.getItem('coffeeReviews'));
		if (reviews) {
			setReviewList(reviews[coffeeData.id] || []);
		} else {
			setReviewList([]);
		}
	}, [coffeeData.id]);

	return (
		<DialogBoxContainer>
			<DialogBox>
				<Header>
					{coffeeData.place_name}

					<button onClick={onClickCloseDialogBox}>X</button>
				</Header>
				<SearchBar onSubmit={onSubmitSaveReview}>
					<input
						type={'text'}
						value={review}
						onChange={onChangeReview}
						placeholder={'리뷰를 남겨주세요'}
					/>
					<button onClick={onSubmitSaveReview}>OK</button>
				</SearchBar>
				<div>{coffeeData.place_name}의 리뷰들</div>
				<ReviewContainer>
					{reviewList.map((v, i) => (
						<Review key={i}>{v}</Review>
					))}
				</ReviewContainer>
			</DialogBox>
			<Backdrop />
		</DialogBoxContainer>
	);
};

export default CoffeeReviewDialogBox;

const DialogBoxContainer = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	z-index: 10;
`;

const DialogBox = styled.dialog`
	position: fixed;
	top: 50%;
	left: 50%;
	transform: translateX(-50%) translateY(-50%);
	width: 400px;
	height: 500px;
	display: flex;
	flex-direction: column;
	align-items: center;
	border: none;
	border-radius: 3px;
	box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
	box-sizing: border-box;
	background-color: white;
	z-index: 60;
`;

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	width: 100%;
	padding: 15px;
	border-bottom: 1px solid;
`;

const SearchBar = styled.form`
	padding: 15px;
	width: 100%;
`;

const ReviewContainer = styled.div`
	padding: 15px;
	width: 100%;
	overflow: scroll;
`;
const Review = styled.div`
	padding-bottom: 10px;
`;

const Backdrop = styled.div`
	width: 100vw;
	height: 100vh;
	position: fixed;
	top: 0;
	z-index: 50;
	background-color: rgba(0, 0, 0, 0.2);
`;
