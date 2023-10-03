window.addEventListener("load", function(){


    let map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.XYZ({
                    url: 'https://api.vworld.kr/req/wmts/1.0.0/01FC9396-78C3-3A58-99A4-EF97461DFFEE/Base/{z}/{y}/{x}.png'
                })
            })
        ],
        view: new ol.View({
            center: ol.proj.transform([127.1775537, 37.2300864], 'EPSG:4326', 'EPSG:3857'),
            zoom: 13,
            minZoom : 0,
            maxZoom : 21,
            
        })
    });
    
    
    



    
    
    
        //레이어 추가
        var boundary2 = new ol.layer.Tile({
            source: new ol.source.TileWMS({
                    url: 'http://localhost:8090/geoserver/wms',
                    params: {
                        'LAYERS': 'sig',
                        'TILED': true,
                        
                    },
                  //  projection: 'EPSG:5186',
                    serverType: 'geoserver',
            })
        });
    
    
    
    
    
        //레이어 추가
        var boundary4 = new ol.layer.Tile({
            source: new ol.source.TileWMS({
                    url: 'http://localhost:8080/geoserver/wms',
                    params: {
                        'LAYERS': 'moct_link_yongin',
                        'TILED': true,
                        
                    },
                    projection: 'EPSG:5186',
                    serverType: 'geoserver',
            })
        });
        map.addLayer(boundary2);
        // map.addLayer(boundary4);
        boundary2.setOpacity(0.5);
        


        const primary = document.querySelector('.primary');
        const satellite = document.querySelector('.satellite');
        const hybrid = document.querySelector('.hybrid');
        const giheung = document.querySelector('.giheung');
        const cheoin = document.querySelector('.cheoin');
        const suji = document.querySelector('.suji');

        /// 지도 유형 선택시 색깔
        primary.onclick = function () {
            map.getLayers().getArray()[0].getSource().setUrl('https://api.vworld.kr/req/wmts/1.0.0/01FC9396-78C3-3A58-99A4-EF97461DFFEE/Base/{z}/{y}/{x}.png');

            primary.style.backgroundColor = '#0D6EFD'; 
            primary.style.color = 'white';

            hybrid.style.background = 'white';
            hybrid.style.color = 'black';
            satellite.style.background = 'white';
            satellite.style.color = 'black';
        }

        hybrid.onclick = function(){
            map.getLayers().getArray()[0].getSource().setUrl('https://api.vworld.kr/req/wmts/1.0.0/01FC9396-78C3-3A58-99A4-EF97461DFFEE/Hybrid/{z}/{y}/{x}.png');

            hybrid.style.backgroundColor = '#0D6EFD';
            hybrid.style.color = 'white';

            primary.style.background = 'white';
            primary.style.color = 'black';
            satellite.style.background = 'white';
            satellite.style.color = 'black';
        }

        satellite.onclick = function(){
            map.getLayers().getArray()[0].getSource().setUrl('https://api.vworld.kr/req/wmts/1.0.0/01FC9396-78C3-3A58-99A4-EF97461DFFEE/Satellite/{z}/{y}/{x}.jpeg');
            satellite.style.backgroundColor = '#0D6EFD';
            satellite.style.color = 'white';

            hybrid.style.background = 'white';
            hybrid.style.color = 'black';
            primary.style.background = 'white';
            primary.style.color = 'black';
        }

        /// 구 선택시 색깔
        giheung.onclick = function(){
            map.getView().setCenter(ol.proj.transform([127.114716, 37.280386], 'EPSG:4326', 'EPSG:3857'));

            giheung.style.backgroundColor = '#0D6EFD'; 
            giheung.style.color = 'white'; 

            cheoin.style.background = 'white';
            cheoin.style.color = 'black';
            suji.style.background = 'white';
            suji.style.color = 'black';
        }
        cheoin.onclick = function(){
            map.getView().setCenter(ol.proj.transform([127.201374, 37.234295], 'EPSG:4326', 'EPSG:3857'));

            cheoin.style.backgroundColor = '#0D6EFD'; 
            cheoin.style.color = 'white';

            giheung.style.background = 'white';
            giheung.style.color = 'black';
            suji.style.background = 'white';
            suji.style.color = 'black';
        }
        suji.onclick = function(){
            map.getView().setCenter(ol.proj.transform([127.097692, 37.322097], 'EPSG:4326', 'EPSG:3857'));

            suji.style.backgroundColor = '#0D6EFD';
            suji.style.color = 'white'; 

            cheoin.style.background = 'white';
            cheoin.style.color = 'black';
            giheung.style.background = 'white';
            giheung.style.color = 'black';
        }


        document.querySelector('.file-label').addEventListener('click', function() {
            document.querySelector('#fileInput').click();
        });


        //  데이터 추가 버튼 클릭시 모달창 띄우기
        const dataInsertBtn = document.querySelector('.data_insert');
        const downloadModal = document.querySelector('.download_modal');
        const modalCloseBtn = document.querySelector('.modal_close');
        const offcanvasCloseBtn = document.querySelector('.btn-close');
        const modalCloseBtn1 = document.querySelector('.modal_close1');

        dataInsertBtn.onclick = function(){
            offcanvasCloseBtn.click();
            downloadModal.style.display = 'block';
        }

        //  "x" 버튼
        modalCloseBtn.onclick = function(){
            downloadModal.style.display = 'none';
        }
        //  "취소" 버튼
        modalCloseBtn1.onclick = function(){
            downloadModal.style.display = 'none';
        }

        let liveBtn = document.querySelector('.liveBtn');
        let offcanvasBtn = document.querySelector('.btn_offcanvas');
        
        let originalBtnColor = getComputedStyle(liveBtn).backgroundColor;
        let isLiveActive = false;
        
        liveBtn.onclick = function(){
            if (isLiveActive) {
                liveBtn.style.backgroundColor = originalBtnColor;
                isLiveActive = false;
                offcanvasBtn.disabled = false; // offcanvasBtn 활성화
            } else {
                liveBtn.style.backgroundColor = 'red';
                isLiveActive = true;
                offcanvasBtn.disabled = true; // offcanvasBtn 비활성화
            }
        }




// datePicker 날짜 선택 이벤트
$('.caledar_date').datepicker().on('changeDate', function(e) {
    // 선택한 날짜에서 연도와 월을 가져옵니다.
    const selectedDate = e.date;
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth() + 1; // 월은 0부터 시작하므로 +1 해줍니다.
    const day = selectedDate.getDate();

    // year, month, day 값을 .form-control 태그에 반영합니다.
    $('.form-control').text(`${year}년 ${month}월 ${day}일`);
});
    });

    
    
    $(function(){
        $('.input-group.date').datepicker({
            calendarWeeks: false,
            todayHighlight: true,
            autoclose: true,
            format: "yyyy/mm/dd",
            language: "kr"
        });
    
        
    });
    // Bootstrap 초기화
document.addEventListener('DOMContentLoaded', function () {
    var myOffcanvas = new bootstrap.Offcanvas(document.getElementById('staticBackdrop'));


//     // datePicker 날짜 선택 이벤트
// $('.caledar_date').datepicker().on('changeDate', function(e) {
//     // 선택한 날짜에서 연도와 월을 가져옵니다.
//     const selectedDate = e.date;
//     const year = selectedDate.getFullYear();
//     const month = selectedDate.getMonth() + 1; // 월은 0부터 시작하므로 +1 해줍니다.
//     const day = selectedDate.getDate();

//     // year와 month 값을 출력합니다.
//     console.log("Year: " + year);
//     console.log("Month: " + month);
//     console.log("day: " + day);
// });



let offcanvasBtn = document.querySelector('.btn_offcanvas');
let map = document.querySelector('#map');

offcanvasBtn.onclick = function(){
    map.style.width = 'calc(100% - 400px)';
    map.style.position = 'fixed'; // 요소를 화면에 고정
    map.style.right = '0'; // 화면 오른쪽으로 밀착
}

let btnClose = document.querySelector('.btn-close');

btnClose.onclick = function(){
    map.style.width = '100%';
}

});

