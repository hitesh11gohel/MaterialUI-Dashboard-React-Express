import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";

// core components
import componentStyles from "assets/theme/components/auth-footer.js";

const useStyles = makeStyles(componentStyles);

const Footer = () => {
  const classes = useStyles();
  return (
    <Box component="footer" width="100%" paddingTop="1rem">
      <Container
        component={Box}
        maxWidth="xl"
        display="flex!important"
        alignItems="center"
        classes={{
          root:
            classes.justifyContentCenter + " " + classes.flexDirectionColumn,
        }}
      >
        <Grid item xs={12} xl={6}>
          <div className={classes.copyrightWrapper}>
            © {new Date().getFullYear()}{" "}
            
              Epistic Technologies
            
          </div>
        </Grid>

        <Grid
          item
          xs={12}
          xl={6}
          component={Box}
          display="flex"
          justifyContent="flex-end"
          classes={{
            root:
              classes.justifyContentCenter + " " + classes.flexDirectionColumn,
          }}
        >
          <Box
            component={List}
            display="flex"
            justifyContent="center"
            alignItems="center"
            classes={{
              root:
                classes.justifyContentCenter +
                " " +
                classes.flexDirectionColumn,
            }}
          >
            
          </Box>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
