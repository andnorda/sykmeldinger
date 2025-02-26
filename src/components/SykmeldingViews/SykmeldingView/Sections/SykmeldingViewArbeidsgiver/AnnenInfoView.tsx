import React from 'react'
import { BodyShort, Heading } from '@navikt/ds-react'
import { Information } from '@navikt/ds-icons'

import { SykmeldtHeading } from '../../Layout/SykmeldtHeading/SykmeldtHeading'
import { SykmeldingFragment } from '../../../../../fetching/graphql.generated'
import { toReadableDate } from '../../../../../utils/dateUtils'
import { getBehandlerName } from '../../../../../utils/behandlerUtils'

import styles from './AnnenInfoView.module.css'

interface Props {
    sykmelding: SykmeldingFragment
}

function AnnenInfoView({ sykmelding }: Props): JSX.Element {
    return (
        <div>
            <SykmeldtHeading title="Annen info" Icon={Information} />
            <div className={styles.info}>
                <Heading className={styles.heading} size="small" level="4">
                    Dato sykmeldingen ble skrevet
                </Heading>
                <BodyShort size="small">{toReadableDate(sykmelding.behandletTidspunkt)}</BodyShort>
            </div>
            <div className={styles.info}>
                <Heading className={styles.heading} size="small" level="4">
                    Sykmeldingen ble skrevet av
                </Heading>
                <BodyShort size="small">{getBehandlerName(sykmelding.behandler)}</BodyShort>
                <BodyShort size="small">
                    {sykmelding.behandler.tlf ? `Tlf: ${sykmelding.behandler.tlf}` : 'Tlf: —'}
                </BodyShort>
            </div>

            {sykmelding.arbeidsgiver && sykmelding.arbeidsgiver?.navn && (
                <div className={styles.info}>
                    <Heading className={styles.heading} size="small" level="4">
                        Arbeidsgiver som er oppgitt i sykmeldingen
                    </Heading>
                    <BodyShort size="small">{sykmelding.arbeidsgiver.navn}</BodyShort>
                </div>
            )}
        </div>
    )
}

export default AnnenInfoView
