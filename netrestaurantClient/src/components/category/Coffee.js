import React, {useEffect, useState} from 'react';
import '../../style/common';
import CoffeeReviewDialogBox from '../coffee/CoffeeReviewDialogBox';

const {kakao} = window;

const Coffee = () => {
	const [isOpened, setIsOpened] = useState(false);
	const [selectedCoffee, setSelectedCoffee] = useState({});

	useEffect(() => {
		// 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
		const placeOverlay = new kakao.maps.CustomOverlay({zIndex: 1});
		const contentNode = document.createElement('div'); // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
		let markers = [];

		const container = document.getElementById('coffee-map'); //지도를 담을 영역의 DOM 레퍼런스
		const options = {
			//지도를 생성할 때 필요한 기본 옵션
			center: new kakao.maps.LatLng(37.520126, 126.929827), //지도의 중심좌표.
			level: 5, // 지도의 확대 레벨
		};

		const map = new kakao.maps.Map(container, options);

		// 장소 검색 객체를 생성합니다
		const ps = new kakao.maps.services.Places(map);

		// 지도에 idle 이벤트를 등록합니다
		kakao.maps.event.addListener(map, 'idle', searchPlaces);

		// 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
		contentNode.className = 'placeinfo_wrap';

		// 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
		// 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
		// addEventHandle(contentNode, 'mousedown', kakao.maps.event.preventMap);
		// addEventHandle(contentNode, 'touchstart', kakao.maps.event.preventMap);

		// 커스텀 오버레이 컨텐츠를 설정합니다
		placeOverlay.setContent(contentNode);

		// 카테고리 검색을 요청하는 함수입니다
		function searchPlaces() {
			// 커스텀 오버레이를 숨깁니다
			placeOverlay.setMap(null);

			ps.categorySearch('CE7', placesSearchCB, {useMapBounds: true});
		}

		// 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
		function placesSearchCB(data, status, pagination) {
			if (status === kakao.maps.services.Status.OK) {
				// 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
				displayPlaces(data);
			} else if (status === kakao.maps.services.Status.ZERO_RESULT) {
				// 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
			} else if (status === kakao.maps.services.Status.ERROR) {
				// 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
			}
		}

		// 지도에 마커를 표출하는 함수입니다
		function displayPlaces(places) {
			for (var i = 0; i < places.length; i++) {
				// 마커를 생성하고 지도에 표시합니다
				var marker = addMarker(
					new kakao.maps.LatLng(places[i].y, places[i].x),
				);

				// 마커와 검색결과 항목을 클릭 했을 때
				// 장소정보를 표출하도록 클릭 이벤트를 등록합니다
				(function (marker, place) {
					kakao.maps.event.addListener(marker, 'click', function () {
						displayPlaceInfo(place);
					});
				})(marker, places[i]);
			}
		}

		// 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
		function addMarker(position) {
			var imageSrc =
					'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
				imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
				imgOptions = {
					spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
					// spriteOrigin: new kakao.maps.Point(46, 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
					spriteOrigin: new kakao.maps.Point(46, 144), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
					offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
				},
				markerImage = new kakao.maps.MarkerImage(
					imageSrc,
					imageSize,
					imgOptions,
				),
				marker = new kakao.maps.Marker({
					position: position, // 마커의 위치
					image: markerImage,
				});

			marker.setMap(map); // 지도 위에 마커를 표출합니다
			markers.push(marker); // 배열에 생성된 마커를 추가합니다

			return marker;
		}

		// 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
		function displayPlaceInfo(place) {
			var content =
				'<div class="placeinfo" >' +
				'   <div class="title" id="coffee-modal-header">' +
				place.place_name +
				'</div>';
			// var content =
			// 	'<div class="placeinfo">' +
			// 	'   <a class="title" href="' +
			// 	place.place_url +
			// 	'" target="_blank" title="' +
			// 	place.place_name +
			// 	'">' +
			// 	place.place_name +
			// 	'</a>';

			if (place.road_address_name) {
				content +=
					'    <span title="' +
					place.road_address_name +
					'">' +
					place.road_address_name +
					'</span>' +
					'  <span class="jibun" title="' +
					place.address_name +
					'">(지번 : ' +
					place.address_name +
					')</span>';
			} else {
				content +=
					'    <span title="' +
					place.address_name +
					'">' +
					place.address_name +
					'</span>';
			}

			content +=
				'    <span class="tel">' +
				place.phone +
				'</span>' +
				'</div>' +
				'<div class="after"></div>';

			contentNode.innerHTML = content;

			placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
			placeOverlay.setMap(map);

			const el = document.getElementById('coffee-modal-header');
			el.addEventListener('click', function () {
				setSelectedCoffee(place);
				setIsOpened(true);
			});
		}

		function onClickCategory() {
			placeOverlay.setMap(null);
			searchPlaces();
		}

		onClickCategory();
	}, []);

	return (
		<div>
			<div
				id='coffee-map'
				style={{width: '800px', height: '600px'}}
			></div>
			{isOpened && (
				<CoffeeReviewDialogBox
					setIsOpened={setIsOpened}
					coffeeData={selectedCoffee}
				/>
			)}
		</div>
	);
};

export default Coffee;
