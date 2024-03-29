
// @flow
import { Box, Button, Typography, styled, IconButton } from '@mui/material';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import downloadIcon from '/assets/pages/result/downloadIcon.png';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import { imageDownload } from './download/imageDownload';

import { theme } from '@/utils/mui/breakpoints';
import customBtn from '/assets/pages/result/customBtn.png';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import ratio_1_1 from '/assets/pages/result/1_1.png';
import ratio_2_3 from '/assets/pages/result/2_3.png';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ModalComponent from './modal/ModalComponent';
import CustomSVG from '../user/CustomSVG';
import domToImg from '@/utils/method/domToImg';
import { saveAs } from 'file-saver';
import CustomBox from './custom/CustomBox';
import resultFilter from '@/utils/method/resultFilter';
import postCustomStyleInfo from '@/apis/postCustomStyleInfo';
import simpsonFilm from '/assets/pages/result/simpsonFilm.png';

import './result.css';
type Props = {};

export const ResultPage = (props: Props) => {
  const [url, setUrl] = useState('');

  const navigate = useNavigate();
  const [change, setChange] = useState(false);
  const [ratioBtn, setRatioBtn] = useState(false);
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('hair');
  const [isColorChange,setIsColorChange] = React.useState('');
  const [custom, setCustom] = useState(false);
  const [previousRatio,setPreviousRatio] = React.useState(false);
  const [animation, setAnimation] = useState(false);

  const svgRef: any = useRef();

  const location = useLocation();
  
  const [info, setInfo] = useState({
    gender: 'female',
    hair: 'long',
    hairColor: 'white',
    top: 'blazer',
    topColor: 'white',
    bottom: 'jeans',
    bottomColor: 'white',
    backgroundColor: 'pink',
    inner: 'basic_t_shirts',
    innerColor: 'white',
  });
  
  useEffect(() => {
    let result = resultFilter(location.state.result);

    setInfo((pre: any) => ({ ...pre, ...result }));
  }, []);

  useEffect(()=>{
    if(custom){
      setRatioBtn(previousRatio);
    }
  },[custom])

  // useEffect(() => {
  //   /* Link로 결과 페이지로 넘어갈떄 props에 state값을 주면 결과 페이지 에서 사용 가능, 나는 이걸 url 상태값에 저장 */
  //   setUrl(location.state.link);
  // });

  const goFirstPage = () => {
    navigate('/', { replace: true });
  };

  const ratioChange = () => {
    /* 비율 수정 */
    setRatioBtn((pre) => !pre);
  };

  const changeBtn = async () => {
    /* 하단 아이콘 버튼 3개 상태 변환 */

    let formData = new FormData();
    console.log(svgRef.current);
    const blob = await domToImg(svgRef.current);
    // let blob = await html2canvasToBlob(svgRef.current);
    console.log('blob', blob);
    // saveAs(blob);

    // blob.toBlob((b: any) => formData.append('file', b));
    formData.append('file', blob);
    formData.append('gender', info.gender);
    formData.append('top', info.top);
    formData.append('top_color', info.topColor);
    formData.append('bottom', info.bottom);
    formData.append('bottom_color', info.bottomColor);

    // 모바일에서 안먹힘..?
    // let link = postCustomStyleInfo(formData);
    // console.log(link);
    // alert('hi');
    // navigate('/result', { state: link });

    let link = await postCustomStyleInfo(formData);
    setUrl(link.link);

    setChange(true);
    setAnimation(true);
  };

  const openModal = () => {
    setAnimation(false);
    setModal((pre) => !pre);
  };

  const onChangeCustom = () => {
    /* 하단 버튼 3개 커스텀 상태 창으로 변환 */
    setCustom((pre) => !pre);
    ratioBtn && setRatioBtn((pre) => !pre);
  };

  const download = async () => {
    /* location의 state값이 undefined이 아니라는 걸 알려주기 위해 사용 */

    const blob = await domToImg(svgRef.current);
    saveAs(blob);

  };

  const styleContainer = {
    height: '100%',
    background: 'linear-gradient(to bottom, #C5E8FF 80%, #FFFFFF 100%)',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
  };

  const FilmLayout = styled('div')(({ theme }) => ({
    height: '100%',
    width: '100%',
    maxWidth: '760px',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    flexWrap:"wrap",
    background: '#ffffff',

    // TODO: 두 가지 버전 확인 받기
    boxShadow:
      'rgba(0, 0, 0, 0.15) 0px 20px 30px, rgba(0, 0, 0, 0.05) 0px 10px 15px',

    // boxShadow: 'rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px',
    justifyContent: 'space-between',
    alignItems: 'center',
    [theme.breakpoints.down('desktop')]: {
      maxWidth: '760px',
      fontSize: '34px',
    },
    [theme.breakpoints.down('tablet')]: {
      fontSize: '20px',
    },
    [theme.breakpoints.up('desktop')]: {
      maxWidth: '652px',
      fontSize: '32px',
    },
  }));

  const headerLayout = {
    // height: '',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const styleTitle = {
    fontWeight: 'medium',
    fontSize: '1em',
    fontFamily: "'Indie Flower', cursive",
  };

  const mainLayout = {
    // height: '70%',

    position: 'relative',
    display: 'flex',
    height:"100%",
    flexDirection: 'column',
    alignItems: 'center',
  };

  const footerLayout = {
    height: '21%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  };

  const styleLeftBtn = {
    p: '6px',
    '&:hover': {
      transform: 'scale(1.2)',
    },
    height: '3em',
    width: '3em',
    minWidth: '58px',
    background: change
      ? 'linear-gradient(135deg, #E9E9E9, #FFFFFF)'
      : 'linear-gradient(135deg, #FFE2C5, #FFF2E4)',
    boxShadow: '3px 3px rgba(0, 0, 0, 0.25)',
    fontSize: 'inherit',
  };

  const styleRightBtn = {
    p: '6px',
    pr: change ? '6px' : 0,
    '&:hover': {
      transform: 'scale(1.2)',
    },
    height: '3em',
    width: '3em',
    minWidth: '58px',
    boxShadow: '3px 3px rgba(0, 0, 0, 0.25)',
    background: 'linear-gradient(135deg, #E9E9E9, #FFFFFF)',
    fontSize: 'inherit',
    position: 'relative',
  };

  const styleCenterBtn = {
    p: '6px',
    '&:hover': {
      transform: 'scale(1.2)',
    },
    height: '3.5em',
    width: '3.5em',
    minWidth: '82px',
    minHeight: '66px',
    background: 'linear-gradient(135deg, #E9E9E9, #FFFFFF)',
    boxShadow: '3px 3px rgba(0, 0, 0, 0.25)',
    fontSize: 'inherit',
    borderRadius: '40%',
  };

  const styleCameraIcon = {
    color: '#989898',
    fontSize: 'inherit',
    height: '2em',
    width: '2em',
  };

  const styleCustomIcon = {
    height: '70%',
  };

  const styleDownloadBtn = {
    p: 0,
    '&:hover': {
      transform: 'scale(1.2)',
    },
    height: '3.5em',
    width: '3.5em',
    minWidth: '82px',
    minHeight: '66px',
    fontSize: 'inherit',
    filter: 'drop-shadow(3px 3px rgba(0, 0, 0, 0.25))',
  };
  
  React.useEffect(()=>{
    setIsColorChange("");
  },[title])

  const date = new Date();

  return (
    <Box sx={styleContainer}>
      <FilmLayout theme={theme}>
        <Box
          className={animation ? 'fadein' : undefined}
          ref={svgRef}
          sx={{
            width: '100%',
            bgcolor: 'white',
            maxHeight: !custom ? "50%" : "100%",
            padding: `15px 20px 0px 20px`,
          }}
        >
          <Box className="headerLayout" sx={headerLayout}>
            <Typography
              onClick={goFirstPage}
              variant="h3"
              align="center"
              sx={[
                styleTitle,
                {
                  // fontFamily: "'Indie Flower', cursive",
                  fontFamily: '-moz-initial',
                  width: '100%',
                  color: '#7E7E7E',
                  opacity: '0.8',
                  lineHeight: 1,
                  padding: '-6px -8px',
                  marginBottom: '6px',
                },
              ]}
            >
              simpsonfilm.com
            </Typography>
          </Box>
          <Box className="mainLayout" sx={mainLayout}>
            <CustomSVG
              info={info}
              ratioBtn={ratioBtn}
              custom={custom}
            ></CustomSVG>
            {!custom ? null : (
              <Box
                sx={{
                  display: 'flex',
                  height: 130,
                  width: '100%',
                  bgcolor: 'white',
                  justifyContent: 'end',
                  padding: 1,
                  fontFamily: '-moz-initial',
                  opacity: '0.8',
                  color: '#7E7E7E',
                }}
              >
                {date.toLocaleDateString()}
              </Box>
            )}
          </Box>
        </Box>
        {!custom ? (
          <CustomBox setInfo={setInfo} onChangeCustom={onChangeCustom} setTitle={setTitle} title={title}
          info={info}
          isColorChange={isColorChange}
          setIsColorChange={setIsColorChange} />
        ) : (
          <Box
            /* footerlayout 제일 하단에 고정 */
            sx={{
              width: '100%',
              position: 'absolute',
              bottom: 50,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <Box className="footerLayout" sx={footerLayout}>
              {/* 커스텀 버튼 */}
              <IconButton
                sx={[styleLeftBtn, { paddingRight: 0 }]}
                onClick={()=>{
                  if(change){
                    goFirstPage();
                  }else{
                    console.log(ratioBtn)
                    setPreviousRatio(ratioBtn)
                    onChangeCustom();
                  }
                }
              }
              >
                {change ? (
                  <HomeOutlinedIcon sx={styleCameraIcon} />
                ) : (
                  <Box
                    component="img"
                    alt="goCustomPage"
                    src={customBtn}
                    sx={styleCustomIcon}
                  />
                )}
              </IconButton>
              {/* 다운로드 버튼 */}
              {change ? (
                <IconButton sx={styleDownloadBtn} onClick={download}>
                  <Box
                    component="img"
                    alt="downloadImage"
                    src={downloadIcon}
                    sx={{
                      height: '120%',
                      textShadow: '3px 3px rgba(0, 0, 0, 0.25)',
                    }}
                  />
                </IconButton>
              ) : (
                <Button sx={styleCenterBtn} onClick={changeBtn}>
                  <PhotoCameraIcon sx={styleCameraIcon} />
                </Button>
              )}
              {/* 비율 변경 버튼 */}
              <IconButton
                sx={styleRightBtn}
                onClick={change ? openModal : ratioChange}
              >
                {change ? (
                  <ShareOutlinedIcon sx={styleCameraIcon} />
                ) : (
                  <Box
                    component="img"
                    alt="ratioControl"
                    src={ratioBtn ? ratio_1_1 : ratio_2_3}
                    sx={{ height: ratioBtn ? '50%' : '40%' }}
                  />
                )}
              </IconButton>
              {modal && (
                <>
                  <Box
                    onClick={() => {
                      openModal();
                    }}
                    sx={{
                      position: 'absolute',
                      background: '#000000',
                      width: '150vw',
                      height: '120vh',
                      top: 0,
                      left: 0,
                      transform: 'translate(-30%,-80%)',
                      opacity: 0.5,
                      zIndex: 5,
                    }}
                  />
                  <ModalComponent url={url} />
                </>
              )}
            </Box>
          </Box>
        )}
      </FilmLayout>
    </Box>
  );
};
