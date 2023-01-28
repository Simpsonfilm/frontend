import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@/components/common/ButtonIcon';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { useQuery } from '@tanstack/react-query';
import { getBestStyle } from '@/apis/getBestStyle';
import CustomSVG from '../user/CustomSVG';
import { Box } from '@mui/system';
import ButtonIcon from '@/components/common/ButtonIcon';
import { theme } from '@/utils/mui/breakpoints';
import { Translate } from '@mui/icons-material';

export default function RankModal({ open, setOpen }: any) {
  const [rankInfo, setRankInfo] = React.useState([
    {
      gender: 'male',
      top: 'shirts',
      top_color: 'white',
      bottom: 'slacks',
      bottom_color: 'white',
      hair: 'middle',
      hairColor: 'black',
      inner: 'basic_t_shirts',
      innerColor: 'white',
      count: '1',
    },
    {
      gender: 'female',
      top: 'shirts',
      top_color: 'white',
      bottom: 'slacks',
      bottom_color: 'white',
      hair: 'long',
      hairColor: 'black',
      inner: 'basic_t_shirts',
      innerColor: 'white',
      count: '1',
    },
  ]);
  const { data: male } = useQuery(
    ['maleRank'],
    async () => await getBestStyle('male'),
    {
      onSuccess(data) {},
    },
  );
  const { data: female } = useQuery(
    ['femaleRank'],
    async () => await getBestStyle('female'),
  );

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const Box1 = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('desktop')]: {
      position: 'absolute',
      width: '100vw',
      height: '100vh',
      top: 0,
      left: 0,
      backgroundColor: 'white',
      opacity: 0.7,
      zIndex: 10,
    },
    [theme.breakpoints.up('desktop')]: {},
  }));

  const Box2 = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',

    [theme.breakpoints.down('desktop')]: {
      position: 'absolute',
      width: '500px',
      height: '600px',
      top: '50%',
      left: '50%',
      transform: `translate(-50%,-50%)`,
      zIndex: 20,
    },
    [theme.breakpoints.up('desktop')]: {},
  }));

  const Box3 = styled('div')(({ theme }) => ({
    [theme.breakpoints.down('desktop')]: {
      position: 'ablsolute',
    },
    [theme.breakpoints.up('desktop')]: {},
  }));

  return (
    <>
      {open ? (
        <Box3>
          <Box1
            onClick={() => {
              setOpen(false);
            }}
            theme={theme}
          ></Box1>
          <Box2
            onClick={() => {
              setOpen(false);
            }}
            theme={theme}
            sx={{ display: 'flex' }}
          >
            {rankInfo?.map((gender) => (
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h4">1st</Typography>
                <CustomSVG info={gender}></CustomSVG>
                <Typography variant="h3">{gender.count}'s pick</Typography>
              </Box>
            ))}
          </Box2>{' '}
        </Box3>
      ) : null}
    </>
  );
}
