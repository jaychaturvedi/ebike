import React from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import CTAHeader from './components/header';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {RegistartionStackParamList} from '../../navigation/registration';
import CTAButton from '../../components/cta-button';
import Unorderedlist from 'react-native-unordered-list';

type EULANavigationProp = StackNavigationProp<
  RegistartionStackParamList,
  'EULA'
>;

interface Props {
  navigation: EULANavigationProp;
  route: RouteProp<RegistartionStackParamList, 'EULA'>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 17,
    lineHeight: 22.42,
    fontWeight: '600',
    color: '#142F6A',
    opacity: 0.9,
  },
  paragraph: {
    marginVertical: 12,
  },
  boldText: {
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    lineHeight: 22.42,
    fontWeight: '400',
    color: '#6F6F6F',
  },
});

export default function EULA(props: Props) {
  return (
    <View style={{height: '100%', width: '100%'}}>
      <CTAHeader title={'End-User License Agreement'} />
      <ScrollView style={{paddingHorizontal: 32}}>
        {/* <Unorderedlist
          bulletUnicode={0x2022}
          color={'#6F6F6F'}
          style={{alignItems: 'center'}}>
          <Text>Grandparent</Text>
        </Unorderedlist> */}
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            <Text style={styles.boldText}>
              This End-User License Agreement ("EULA")
            </Text>{' '}
            is a legal agreement between you{' '}
            <Text style={styles.boldText}>(“End User”)</Text> and Motovolt
            Mobility Private Limited (MOVO) .
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            This EULA governs the End User’s use of{' '}
            <Text style={styles.boldText}>“Motovolt App”</Text> (referred to as{' '}
            <Text style={styles.boldText}>“App”</Text>) provided by MOVO.
            Motovolt App is connected app for personal owners of electric
            vehicles from MOVO
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            Please read this EULA carefully before completing the installation
            process or using this App. By clicking "accept" or installing and/or
            using the App, this EULA forms a binding Agreement between the End
            User and MOVO. In the event the End User does not agree the terms of
            this EULA, the End User should not accept the terms of the EULA and
            should not use the App. If End User is entering into this EULA on
            behalf of a company or other legal entity, End User represents that
            the End User has the authority to bind such entity and its
            affiliates to these terms and conditions. If the End User does not
            have such authority, the End User should not install or use the App
            and the End User must not accept this EULA
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            This EULA shall apply only to the App supplied by MOVO. The End User
            acknowledges that the App may contain proprietary software of third
            parties{' '}
            <Text style={styles.boldText}>(“Third Party Software”)</Text> use of
            which is governed by their respective licenses. End User’s use of
            Third Party Software shall be subject to the respective terms and
            conditions of such Third Party Software. Such Third Party Software
            are provided by MOVO “as is” and MOVO does not make any
            representation or warranty of any kind with respect to use of such
            Third Party Software. The terms of this EULA applies to any MOVO
            updates, supplements, Internet-based services, and support services
            for the Software, unless other terms accompany those items on
            delivery. If so, those terms shall be applicable on the End User for
            the use of the App. The terms of this EULA shall also be applicable
            for any trial version of the App or trial of any additional service
            available through the App.
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.title}>Charges:</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            Access to the App is free and MOVO does not charge any fee for using
            the App. MOVO reserves the right to change its fee policy from time
            to time. In particular, MOVO may at its sole discretion introduce
            new Services and modify some or all of the existing Services offered
            on the App. Unless otherwise stated, all fees shall be quoted in
            Indian Rupees. You shall be solely responsible for compliance of all
            applicable laws for making payments to MOVO.
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.title}>License Grant:</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            MOVO hereby grants the End User a limited, non-transferable, non-sub
            licensable, non-assignable, revocable and non-exclusive licence to
            use this App on End User's devices solely for the purpose of
            personal use & in accordance with the terms of this EULA
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.title}>
            Right to Monitor and Collect Information:
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            MOVO will have the right to monitor all use of App and collect
            information associated vehicle information for diagnostics,
            research, for any other internal business purposes and to ensure
            compliance with the terms of this EULA. Information collected by
            MOVO through the App will include various vehicle performance
            parameters including vehicle location (“Information”). The End User
            acknowledges that the Information collected by MOVO shall be the
            property of MOVO and MOVO shall own all rights, title and interest
            in such Information. This EULA does not grant any license to the End
            User to use the Information except for the purpose of personal
            consumption in relation to the use of the vehicle and the App.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.title}>Upgrade & Maintenance:</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            MOVO shall right to upgrade and maintenance of the App on frequent
            intervals. End Users will be informed in advance about such upgrades
            and maintenance by way of notification on the App and/or by way of
            any other means of communication.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.title}>Restrictions:</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>End Users are not permitted to:</Text>
        </View>
        <View style={styles.paragraph}>
          <Unorderedlist
            bulletUnicode={0x2022}
            color={'#6F6F6F'}
            style={{fontSize: 20}}>
            <Text style={styles.text}>
              Edit, alter, modify, replace, adapt, translate or otherwise change
              the whole or any part of the App nor permit the whole or any part
              of the App to be combined with or become incorporated in any other
              software, nor decompile, disassemble or reverse engineer the App
              or attempt to do any such things either directly or through a
              third party whether for itself or for the benefit of a third
              party.
            </Text>
          </Unorderedlist>
          <Unorderedlist
            bulletUnicode={0x2022}
            color={'#6F6F6F'}
            style={{fontSize: 20}}>
            <Text style={styles.text}>
              Fix or attempt to fix any errors or bugs in the App.
            </Text>
          </Unorderedlist>
          <Unorderedlist
            bulletUnicode={0x2022}
            color={'#6F6F6F'}
            style={{fontSize: 20}}>
            <Text style={styles.text}>
              Reproduce, copy, distribute, resell or otherwise use the App or
              any part thereof for any commercial purpose.
            </Text>
          </Unorderedlist>
          <Unorderedlist
            bulletUnicode={0x2022}
            color={'#6F6F6F'}
            style={{fontSize: 20}}>
            <Text style={styles.text}>
              Allow any third party to use the App on behalf of or for the
              benefit of any third party.
            </Text>
          </Unorderedlist>
          <Unorderedlist
            bulletUnicode={0x2022}
            color={'#6F6F6F'}
            style={{fontSize: 20}}>
            <Text style={styles.text}>
              Use the App to develop software applications for use by or
              distribution to any third party, whether in whole or part, whether
              as standalone products or as components.
            </Text>
          </Unorderedlist>
          <Unorderedlist
            bulletUnicode={0x2022}
            color={'#6F6F6F'}
            style={{fontSize: 20}}>
            <Text style={styles.text}>
              Represent or imply to any party that it is an authorized or
              certified provider of services for MOVO.
            </Text>
          </Unorderedlist>
          <Unorderedlist
            bulletUnicode={0x2022}
            color={'#6F6F6F'}
            style={{fontSize: 20}}>
            <Text style={styles.text}>
              Use the App in any way which breaches any applicable local,
              national or international law. Use the App for any purpose that
              MOVO considers is a breach of this EULA
            </Text>
          </Unorderedlist>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.title}>Intellectual Property Rights:</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            MOVO shall at all times retain rights, title and ownership including
            all Intellectual Property Rights in the App as originally
            downloaded/accessed by the End User and all subsequent
            downloads/updates of the App. The App (and the Intellectual Property
            Rights of whatever nature in the App, including any modifications
            made thereto) are and shall remain the property of MOVO and no
            rights, title and interest in the App are transferred to End User
            under this EULA.
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            <Text style={styles.boldText}>“Intellectual Property Rights”</Text>{' '}
            shall mean all rights in all patents, patent applications,
            trademarks, service marks, trade names, trademark registrations,
            service mark registrations, copyrights, licenses, inventions, trade
            secrets and any other similar rights in any jurisdictions, whether
            protected under law or not.
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.title}>No Warranty:</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            MOVO expressly disclaims any warranty for the App. The App & any
            related documentation is provided “as is” without warranty of any
            kind, either express or implied, including without any limitation,
            any warranty for App being free from errors, uninterrupted use of
            the App or any implied warranties or merchantability, fitness for a
            particular purpose, or non-infringement. The entire risk arising out
            of use or performance of the App remains with the End User.
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.title}>Confidential Information:</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            The End User may during the use of App receive or gain access to
            proprietary information of MOVO including but limited to information
            related to its business, technology, or products (“Confidential
            Information"). The End user hereby agrees to keep such Confidential
            Information secret and confidential and not use such Confidential
            Information for any purpose other than as provided under this EULA.
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.title}>Indemnification:</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            The End User shall defend, indemnify and hold harmless MOVO, its
            directors, employees, agents and representatives from and against
            any claims, demands, loss, damage, liability, causes of action,
            judgments, or costs and expenses of every nature (including
            attorney’s fees and expenses) resulting from: (i) breach of any
            terms and conditions, obligations, covenants, warranties and
            representations by the End User; (ii) violation of any applicable
            laws by the End User; and (iii) fraud or fraudulent
            misrepresentation by the End User.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.title}>No Liability for Damages:</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            In no event MOVO shall be liable for any special, consequential,
            incidental or indirect damages whatsoever (including, without
            limitation, damages for loss of business profits, business
            interruption, loss of business information, or any other pecuniary
            loss) arising out of the use of or inability to use the App, even if
            MOVO is aware of the possibility of such damages and known defects.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.title}>Termination:</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            This EULA is effective from the date of download or the first use
            the App and shall continue until terminated. MOVO retains the right
            to terminate this EULA immediately if the End User fails to comply
            with any term or obligation of this EULA. Upon termination of this
            EULA, the licenses granted under this EULA will immediately
            terminate and the account of the End User on the Software shall be
            deactivated by MOVO. The provisions that by their nature continue
            and survive will survive any termination of this EULA agreement.
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.title}>Grievance Officer:</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            All service complaints relating to the functioning of the App can be
            logged in through the details specified below, which will be
            attended by an appointed personnel of the MOVO.
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.text}>
            For any service related queries or complaints relating to the App,
            you can write to us at{' '}
            <Text style={{textDecorationLine: 'underline', color: 'blue'}}>
              hello@motovolt.co
            </Text>
            .
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.title}>Governing Law:</Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            This EULA, and any dispute arising out of or in connection with this
            EULA, shall be governed by and construed in accordance with the laws
            of India. The Courts at Bangalore shall have exclusive jurisdiction
            in respect of all matters arising under or out of this Agreement.
          </Text>
        </View>
        <View style={{height: 32}}></View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <CTAButton
            text={'Accept & Continue'}
            textColor={'white'}
            backgroundColor={'rgba(20, 47, 106, 1)'}
            onPress={() => {
              props.navigation.replace('ValidateFrame', {});
            }}
          />
        </View>
      </ScrollView>
      <View style={{height: 32}}></View>
    </View>
  );
}
