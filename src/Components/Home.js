import React from 'react';
import Routes from '../Routes';
import {Link} from 'react-router-dom';
import {Card, CardTitle, CardActions} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import LaunchIcon from 'material-ui/svg-icons/action/launch';
import Divider from 'material-ui/Divider';

const Home = props => (
  <div className="home-list">
    {Routes.filter(r => r.exercise).map(r => {
      return (
        <div className="home-item" key={r.title}>
          <Card>
            <CardTitle
              title={r.title}
              subtitle={r.subtitle}
              subtitleStyle={{height: '2rem'}}
            />
            <Divider />
            <CardActions style={{textAlign: 'right'}}>
              <Link to={r.path}>
                <IconButton>
                  <LaunchIcon />
                </IconButton>
              </Link>
            </CardActions>
          </Card>
        </div>
      );
    })}
  </div>
);

export default Home;
