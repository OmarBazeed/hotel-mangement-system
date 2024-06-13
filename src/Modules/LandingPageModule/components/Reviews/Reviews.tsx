import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { Rating, Stack } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import review1 from "../../../../assets/reviewsImgs/download (1).jpeg";
import review2 from "../../../../assets/reviewsImgs/download (2).jpeg";
import review3 from "../../../../assets/reviewsImgs/download (3).jpeg";
import review4 from "../../../../assets/reviewsImgs/download.jpeg";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Reviews() {
  const reviews = [
    {
      id: 1,
      img: review1,
      review: "A Quirky and Wild Ride Through Four Rooms",
      desc: '"Four Rooms" is a delightful rollercoaster of absurdity and creativity. Each segment, directed by different auteurs like Quentin Tarantino and Robert Rodriguez, brings a unique flavor to the overall narrative',
      rating: 4,
      roomName: "chalet 4",
    },
    {
      id: 2,
      img: review2,
      review: "An Anthology of Eccentricities and Twists",
      desc: "Each room presents a mini-story that feels like a wild ride through the imaginations of its directors. Quentin Tarantino segment is a standout, filled with his trademark dialogue and unexpected twists that keep you hooked ",
      rating: 2,
      roomName: "Green Room",
    },
    {
      id: 3,
      img: review3,
      review:
        "A Cinematic Experiment that Pays Off , really nive to start vaccation",
      desc: "From Tarantino sharp wit to Allison Anders poignant exploration of human relationships, the directors showcase their distinct styles while maintaining a cohesive narrative thread",
      rating: 3,
      roomName: "red evil room",
    },
    {
      id: 4,
      img: review4,
      review: " A Wild and Wacky Ride with Four Rooms",
      desc: "offering four distinct stories that range from hilarious to bizarre. Tim Roth shines as the beleaguered bellboy who navigates through a series of increasingly absurd situations with comedic finesse",
      rating: 5,
      roomName: "paris vacation",
    },
  ];
  const [activeStep, setActiveStep] = React.useState(0);
  const theme = useTheme();
  const maxSteps = reviews.length;

  // const getReviews = React.useCallback(async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${getBaseUrl()}/api/v0/portal/room-reviews/665bab05a17944edfd9f5d02`,
  //       {
  //         headers: requestHeaders,
  //       }
  //     );

  //     setReviews(data.data.roomReviews);

  //     setRating(data.data.roomReviews[0].rating);
  //   } catch (error) {
  //     if (axios.isAxiosError(error) && error.response) {
  //       toast.error(error.response.data.message || "fail adding");
  //     }
  //   }
  // }, [requestHeaders]);

  const handleNext = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep: number) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ maxWidth: "100%", flexGrow: 1, padding: "20px" }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          height: 50,
          pl: 2,
          bgcolor: "background.default",
        }}
      ></Paper>
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {reviews.map(
          (
            review: {
              img: string;
              review: string;
              rating: number;
              id: number;
              roomName: string;
              desc: string;
            },
            index: number
          ) => (
            <div key={review.id} style={{ width: "100%", margin: "auto" }}>
              {Math.abs(activeStep - index) <= 2 ? (
                <Stack
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                  spacing={6}
                  direction={"row"}
                  sx={{
                    flexWrap: {
                      xs: "wrap",
                      lg: "nowrap",
                    },
                  }}
                >
                  <Box overflow={"hidden"}>
                    <img
                      src={review.img}
                      alt="..."
                      style={{
                        height: "600px",
                        maxWidth: "800px",
                        boxShadow: "2px 2px 2px gray",
                        borderRadius: "30px",
                      }}
                    />
                  </Box>
                  <Box
                    sx={{ maxWidth: { xs: "100%", lg: "40%" } }}
                    component={"div"}
                    display={"flex"}
                    flexDirection={"column"}
                    justifyContent={"space-between"}
                  >
                    <Typography
                      component={"h2"}
                      fontWeight={600}
                      fontSize={"1.5rem"}
                      sx={{ textTransform: "uppercase", marginBottom: "30px" }}
                    >
                      {review?.roomName}
                    </Typography>
                    <Typography
                      component={"h2"}
                      fontWeight={600}
                      fontSize={"1.5rem"}
                    >
                      {review?.review}
                    </Typography>
                    <Typography>{review?.desc}</Typography>
                    <Box display="flex" alignItems="center" marginTop={2}>
                      {/* Rating component */}
                      <Rating
                        name="read-only"
                        value={review?.rating}
                        readOnly
                      />
                      {/* Rating text */}
                      <Typography variant="body1" sx={{ marginLeft: 1 }}>
                        {review?.rating != null && review?.rating.toFixed(1)}
                      </Typography>
                    </Box>
                  </Box>
                </Stack>
              ) : null}
              <Typography></Typography>
            </div>
          )
        )}
      </AutoPlaySwipeableViews>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <MobileStepper
          steps={maxSteps}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button
              size="small"
              onClick={handleNext}
              disabled={activeStep === maxSteps - 1}
              sx={{ marginLeft: "25px" }}
            >
              Next
              {theme.direction === "rtl" ? (
                <KeyboardArrowLeft />
              ) : (
                <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={handleBack}
              disabled={activeStep === 0}
              sx={{ marginRight: "25px" }}
            >
              {theme.direction === "rtl" ? (
                <KeyboardArrowRight />
              ) : (
                <KeyboardArrowLeft />
              )}
              Back
            </Button>
          }
          sx={{ width: "fit-content" }}
        />
      </Box>
    </Box>
  );
}
