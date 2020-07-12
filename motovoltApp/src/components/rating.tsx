import React from 'react'
import { } from 'react-native'
import { AirbnbRating, Rating } from 'react-native-ratings'
import { moderateScale } from 'react-native-size-matters'


type Props = {
    maxRating: number,
    defaultRating: number,
    ratingCompleted: (rating: number) => void
}
type State = {}

export default class StarRating extends React.PureComponent<Props, State>{
    render() {
        return (
            <AirbnbRating
                count={this.props.maxRating}
                defaultRating={this.props.defaultRating}
                size={moderateScale(40)}
                showRating={false}
                starStyle={{}}
                onFinishRating={this.props.ratingCompleted}
            />
        )
    }
}