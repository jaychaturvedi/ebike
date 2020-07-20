import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import FooterNav, { TFooterItem } from '../screens/home/components/footer/index'
import HomeStack from './home'
import StatisticsStack from './statistics'
import MyCycleStack from './cycle'
import MenuStack from './menu'
import RideStack from './ride'
import RideFeedBack from './feedback'

type Props = {}
type State = {
    screen: TFooterItem,
    lockVerified?: boolean,
    hideFooter?: boolean
}

export default class FooterNavigation extends React.PureComponent<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            screen: "home",
            lockVerified: undefined,
            hideFooter: undefined,
        }
    }

    renderScreen(screen: TFooterItem) {
        console.log("Entered stack renderer")
        switch (screen) {
            case 'home':
                return <HomeStack />
            case "cycle":
                return <MyCycleStack />
            case 'chart':
                return <StatisticsStack />
            case 'menu':
                return <MenuStack />
            default:
                return <HomeStack />
        }
    }

    render() {
        return (
            <View style={styles.container} >
                <View style={{ ...styles.screen }}>
                    {
                        this.state.lockVerified === true ? <RideStack />
                            : this.state.lockVerified === false ?
                                <RideFeedBack /> : this.renderScreen(this.state.screen)

                    }
                </View>
                {
                    !this.state.hideFooter && <FooterNav
                        locked
                        onItemSelect={(item) => {
                            this.setState({ screen: item, lockVerified: undefined })
                        }}
                        onLockClick={() => console.log("Lock clicked")}
                        selectedItem={this.state.screen}
                        lockOnlyVisible={this.state.lockVerified !== undefined ? this.state.lockVerified : false}
                        onLockVerified={(verified) => this.setState({ lockVerified: verified, hideFooter: !verified })}
                    />
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        height: '100%'
    },
    screen: {
        flex: 1
    }
})