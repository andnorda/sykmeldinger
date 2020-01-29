import './Statuspanel.less';

import React from 'react';
import { Knapp } from 'nav-frontend-knapper';
import { Panel } from 'nav-frontend-paneler';

import EtikettMedTekst from '../Infopanel/layout/EtikettMedTekst';
import Margin from '../Infopanel/layout/Margin';
import tekster from './Statuspanel-tekster';
import useFetch, { FetchState, hasFinished, isNotStarted } from '../../hooks/useFetch';
import { Sykmelding } from '../../types/sykmeldingTypes';
import { tilLesbarDatoMedArstall } from '../../utils/datoUtils';

interface AvbruttStatuspanelProps {
    sykmelding: Sykmelding;
}

const AvbruttStatuspanel = ({ sykmelding }: AvbruttStatuspanelProps) => {
    const brukSykmelding = useFetch<any>();

    // TODO: sykmelding.bekreftetDato
    if (!true) {
        return null;
    }

    // TODO: Erstatt datoer med de faktiske datoene
    // dato sendt

    return (
        <Margin>
            <Panel border>
                <div className="statuspanel">
                    <div className="statuspanel__element">
                        <EtikettMedTekst
                            tittel={tekster['statuspanel.status']}
                            tekst={tekster['statuspanel.status.avbrutt']}
                        />
                    </div>
                    <div className="statuspanel__element">
                        <EtikettMedTekst
                            tittel={tekster['statuspanel.dato-sendt']}
                            tekst={tilLesbarDatoMedArstall(new Date())}
                        />
                    </div>
                </div>
                <div className="statuspanel-knapp">
                    <Knapp
                        onClick={() => {
                            if (isNotStarted(brukSykmelding)) {
                                brukSykmelding.fetch(
                                    `${process.env.REACT_APP_API_URL}/sykmelding/bruk/${sykmelding.id}`,
                                    {
                                        method: 'POST',
                                    },
                                    (fetchState: FetchState<any>) => {
                                        if (hasFinished(fetchState)) {
                                            // TODO: Trigger refetch uten å reloade siden
                                            window.location.reload();
                                        }
                                    },
                                );
                            }
                        }}
                    >
                        Bruk sykmeldingen
                    </Knapp>
                </div>
            </Panel>
        </Margin>
    );
};

export default AvbruttStatuspanel;
