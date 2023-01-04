import { Box, CardMedia, Grid, IconButton, List, ListItem, Typography, useMediaQuery, useTheme } from '@mui/material';
import diaryImage from "../../images/diary.png"
import relationImage from "../../images/relation.png"
import messageImage from "../../images/message.png"
import { Stack } from "@mui/system";
import { useNavigate } from 'react-router-dom';
import ArrowBack from '@mui/icons-material/ArrowBack';

export const About = () => {
  const navigate = useNavigate();

  const theme = useTheme();
  const smSize = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickToTop = () => {
    navigate(-1)
  }

  return (
    <Box sx={{ bgcolor: "#FFFAF0", mx: { xs: 1, sm: 5 }, mt: 5, }}>
      <Box
        sx={{
          width: "100%", p: 3, bgcolor: "rgba(255,255,255,0.4)",
          backgroundBlendMode: "lighten",
          backgroundImage: 'url(http://localhost:8000/top.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: "right",
        }}>
        <IconButton onClick={handleClickToTop} sx={{ position: "absolute", top: 25, left: 30, border: "solid 1px" }}>
          <ArrowBack />
        </IconButton>
        <Box sx={{ display: "flex", my: 3 }}>
          <Typography sx={{
            fontSize: "30px",
            fontWeight: 300,
            letterSpacing: '.4rem',
            borderBottom: "solid 0.5px silver"
          }}>
            Chairについて
          </Typography>
        </Box>
        <Typography variant="caption" sx={{ letterSpacing: '.2rem', }}>
          Chairは、<u>看護師によって</u>開発された日記投稿SNSです。<br />
          入院中の似た境遇の患者様同士が、<br />
          椅子(Chair)に腰をかけて気持ちを語り合うことで、<br />
          闘病生活の孤独感、辛さを拭い、お互いを勇気づける姿から着想を得ました。<br /><br />
          病を抱え生活している方々の多くは辛さや不安、<br />
          反対に治療後の生活への期待や回復の喜びなど、<br />
          多くの感情を抱えているかと思います。<br /><br />
          Chairは日々の記録を日記として残しながら、<br />
          それぞれの感情を似た立場にある方同士で共有することで、<br />
          少しでも多くの方の病に立ち向かう気持ちの支えになることを目的としています。
        </Typography>
      </Box>
      <Box sx={{ mt: 10, p: { xs: 1, md: 3 } }}>

        <Box sx={{ display: "flex", }}>
          <Typography sx={{
            fontSize: "30px",
            fontWeight: 300,
            letterSpacing: '.4rem',
            borderBottom: "solid 0.5px silver"
          }}>
            Chairでできること
          </Typography>
        </Box>
        <List >
          <ListItem sx={{ display: "flex" }}>
            <Grid container>
              <Grid item xs={12} md={7} sx={{ width: "50%" }}>
                <Stack spacing={1}>
                  <Typography component="h6" variant="h6" sx={{ letterSpacing: '.4rem', }}>〜 日記を書く。読む。〜</Typography>
                  <Box sx={{
                    p: 2,
                    bgcolor: "rgba(255,255,255,0.4)",
                    backgroundBlendMode: "lighten",
                    backgroundImage: smSize && 'url(http://localhost:8000/diary.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: "right",
                  }}>
                    <Typography variant="caption" sx={{ letterSpacing: '.2rem', }}>
                      嬉しかったこと、辛かったこと、病と共に生活することで生まれる様々な出来事や感情を書き留めましょう。<br />
                      画像も合わせて投稿することができます。<br /><br />
                      また、自分の日記はもちろん他のユーザーの日記も読むことができます。<br />
                      同じ疾患があったり、同じ悩みを抱えていたり、<br />
                      あなたが一人ではないことを感じることができるかもしれません。<br /><br />
                      日記には応援の意味でCheer!を送ることや、コメントを送ることができます。<br />
                      日記は自分だけが見れるよう非公開にもできますが、<br />
                      公開することであなたの日記が似た境遇の誰かの心に良い影響をもたらすかもしれません。
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={0} md={5}>
                <CardMedia
                  component="img"
                  src={diaryImage}
                  alt="diary image"
                  sx={{
                    display: { xs: "none", md: "block" },
                    height: "80%",
                    borderRadius: 3,
                    mx: 5
                  }
                  } />
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{ display: "flex", justifyContent: "flex-end", height: "100%", mt: { xs: 3, md: 5, lg: 0 } }}>
            <Grid container >
              < Grid item xs={12} md={6} >
                <CardMedia
                  component="img"
                  src={relationImage}
                  alt="relation image"
                  sx={{
                    height: "60% ",
                    display: { xs: "none", md: "block" },
                    ml: "auto",
                    borderRadius: 3,
                  }} />
              </Grid>
              <Grid item xs={0} md={6} width="100%">
                <Stack spacing={2} sx={{ ml: { xs: 0, md: 5 }, }}>
                  <Typography component="h6" variant="h6" sx={{ letterSpacing: '.2rem' }}>〜 ユーザーをフォローする。〜</Typography>
                  <Box sx={{
                    p: 2,
                    bgcolor: "rgba(255,255,255,0.4)",
                    backgroundBlendMode: "lighten",
                    backgroundImage: smSize && 'url(http://localhost:8000/relation.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: "right",
                  }}>
                    <Typography variant="caption" sx={{ letterSpacing: '.2rem' }}>
                      興味のあるユーザーをフォローすることができます。<br />
                      多くのユーザーと繋がりを持ち、日記や気持ちを共有してみてください。<br /><br />
                      お互いをよりよく知ることで支え合う力が強くなるよう、<br />
                      プロフィールには疾患、年齢、性別についての情報以外にも<br />
                      好きなことや自己紹介を記入できるようになっています。<br />
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </ListItem>
          <ListItem sx={{ display: "flex", mt: 5 }}>
            <Grid container >
              <Grid item xs={12} md={6}>
                <Stack spacing={2} sx={{ mr: 5 }}>
                  <Typography component="h6" variant="h6" sx={{ letterSpacing: '.2rem' }}>〜 メッセージを送る。〜</Typography>
                  <Box sx={{
                    p: 2,
                    bgcolor: "rgba(255,255,255,0.4)",
                    backgroundBlendMode: "lighten",
                    backgroundImage: smSize && 'url(http://localhost:8000/message.png)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: "right",
                  }}>
                    <Typography variant="caption" sx={{ letterSpacing: '.2rem' }}>
                      日記へのコメント以外にもユーザーに直接メッセージを送ることができます。<br />
                      やりとりを通じて多くのユーザーと気持ちを共有してみてください。<br />
                      みなさんが互いを励まし合えるツールの一つになれば幸いです。
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              < Grid item xs={0} md={6} >
                <CardMedia
                  component="img"
                  src={messageImage}
                  alt="relation image"
                  sx={{
                    display: { xs: "none", md: "block" },
                    height: "60%",
                    borderRadius: 3,
                  }} />
              </Grid>
            </Grid>
          </ListItem>
        </List>
        <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", mb: 3, gap: 1 }}>
          <Typography color="gray" textAlign="center" variant='caption'>お問合せはアプリ内または、<br /><u>chairapp64@gmail.com</u>まで<br />お気軽にお送りください。
          </Typography>
          <IconButton onClick={handleClickToTop} sx={{ border: "solid 1px" }}>
            <ArrowBack />
          </IconButton>
        </Box>

      </Box>
    </Box >
  );
}
