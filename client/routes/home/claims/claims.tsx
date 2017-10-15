import {ObservableComponent} from "../../../utils/mobx/ObservableComponent";
import List, {ListItem, ListItemText} from "material-ui/List";
import * as React from "react";
import Grid from "material-ui/Grid";
import {TextField} from "material-ui";
import Divider from "material-ui/Divider";
import {claims} from "./claims.less";
import Toolbar from "material-ui/Toolbar";
import Card, {CardContent} from "material-ui/Card";
import IconButton from "material-ui/IconButton";
import PlaylistAdd from "material-ui-icons/PlaylistAdd";
import Delete from "material-ui-icons/Delete";

export class Claims extends ObservableComponent {

  renderList() {
    return (
      <List className="claims-list">
        <ListItem button>
          <ListItemText primary="Photos" secondary="Jan 9, 2016"/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Photos" secondary="Jan 9, 2016"/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Photos" secondary="Jan 9, 2016"/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Photos" secondary="Jan 9, 2016"/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Work" secondary="Jan 7, 2016"/>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Photos" secondary="Jan 9, 2016"/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Photos" secondary="Jan 9, 2016"/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Photos" secondary="Jan 9, 2016"/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Photos" secondary="Jan 9, 2016"/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Work" secondary="Jan 7, 2016"/>
        </ListItem>
        <ListItem button>
          <ListItemText primary="Photos" secondary="Jan 9, 2016"/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Photos" secondary="Jan 9, 2016"/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Photos" secondary="Jan 9, 2016"/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Photos" secondary="Jan 9, 2016"/>
        </ListItem>
        <Divider/>
        <ListItem button>
          <ListItemText primary="Work" secondary="Jan 7, 2016"/>
        </ListItem>
      </List>
    );
  }

  renderCard() {
    return (
      <Card>
        <CardContent>
          <TextField label="Name"
                     value={"asd"}
                     margin="normal"/>
        </CardContent>
      </Card>
    );
  }

  render() {
    return (
      <div className={claims}>
        <Toolbar className="claims-toolbar">
          <IconButton>
            <PlaylistAdd/>
          </IconButton>
          <IconButton>
            <Delete/>
          </IconButton>
        </Toolbar>
        <Grid container spacing={0} className="claims-content">
          <Grid item xs={4}>
            {this.renderList()}
          </Grid>
          <Grid item xs={8} className="claim-info">
            {this.renderCard()}
          </Grid>
        </Grid>
      </div>
    );
  }
}