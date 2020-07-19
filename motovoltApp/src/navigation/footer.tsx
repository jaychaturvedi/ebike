import React from 'react'
import { View, StyleSheet, Text } from 'react-native'
import FooterNav, { TFooterItem } from '../screens/home/components/footer/index'
import HomeStack from './home'
import StatisticsStack from './statistics'
import MyCycleStack from './cycle'
import MenuStack from './menu'
import RideStack from './ride'

type Props = {}
type State = {
    screen: TFooterItem,
    lockVerified: boolean
}


export default class FooterNavigation extends React.PureComponent<Props, State>{
    constructor(props: Props) {
        super(props)
        this.state = {
            screen: "home",
            lockVerified: false
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
                <View style={styles.screen}>
                    {
                        this.state.lockVerified ? <RideStack />
                            : this.renderScreen(this.state.screen)
                    }
                </View>
                <FooterNav
                    locked
                    onItemSelect={(item) => {
                        this.setState({ screen: item })
                    }}
                    onLockClick={() => console.log("Lock clicked")}
                    selectedItem={this.state.screen}
                    lockOnlyVisible={this.state.lockVerified}
                    onLockVerified={(verified) => this.setState({ lockVerified: verified })}
                />
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