import React, { useRef, useEffect } from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Normaltekst, Sidetittel } from 'nav-frontend-typografi';
import Lenke from 'nav-frontend-lenker';

import { Sykmelding } from '../../../types/sykmeldingTypes';
import tekster from './nysykmelding-tekster';
import Sidetopp from '../../sidetopp/Sidetopp';
import InfoPanel from '../../infopanel/InfoPanel';
import Veileder from '../../veileder/Veileder';
import EldreSykmeldingVarsel from './components/EldreSykmeldingVarsel';
import SykmeldingPerioder from '../../infopanel/panelelementer/periode/SykmeldingPerioder';
import DiagnoseSeksjon from '../../infopanel/panelelementer/diagnose/DiagnoseSeksjon';
import FraverSeksjon from '../../infopanel/panelelementer/FraverSeksjon';
import SvangerskapSeksjon from '../../infopanel/panelelementer/SvangerskapSeksjon';
import SkadeSeksjon from '../../infopanel/panelelementer/SkadeSeksjon';
import ArbeidsuforSeksjon from '../../infopanel/panelelementer/ArbeidsuforSeksjon';
import PrognoseSeksjon from '../../infopanel/panelelementer/PrognoseSeksjon';
import ArbeidsgiverSeksjon from '../../infopanel/panelelementer/ArbeidsgiverSeksjon';
import LegeSeksjon from '../../infopanel/panelelementer/LegeSeksjon';
import BehandlingsDatoer from '../../infopanel/utdypendeelementer/BehandlingsDatoer';
import MulighetForArbeid from '../../infopanel/utdypendeelementer/MulighetForArbeid';
import Friskmelding from '../../infopanel/utdypendeelementer/Friskmelding';
import UtdypendeOpplysninger from '../../infopanel/utdypendeelementer/UtdypendeOpplysninger';
import Arbeidsevne from '../../infopanel/utdypendeelementer/Arbeidsevne';
import SeksjonMedTittel from '../../infopanel/layout/SeksjonMedTittel';
import ElementMedTekst from '../../infopanel/layout/ElementMedTekst';
import Utvidbar from '../../utvidbar/Utvidbar';

import doktor from '../../../svg/doktor.svg';
import doktorHover from '../../../svg/doktorHover.svg';

interface SykmeldingProps {
    sykmelding: Sykmelding;
}

const NySykmelding: React.FC<SykmeldingProps> = ({ sykmelding }: SykmeldingProps) => {
    const utfyllingRef = useRef<HTMLDivElement>(document.createElement('div'));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    console.log(sykmelding);

    return (
        <div className="sykmelding-container">
            <Sidetopp tekst="Sykmelding" />
            <EldreSykmeldingVarsel />
            <Veileder
                innhold={<Normaltekst>{tekster['ny-sykmelding.introtekst']}</Normaltekst>}
                onClick={() => window.scrollTo({ top: utfyllingRef.current.offsetTop - 100, behavior: 'smooth' })}
                knappTekst="Gå til utfyllingen"
            />

            <InfoPanel tittel="Din sykmelding" fargetema="info">
                <Sidetittel className="panel-content-header">Sykmelding</Sidetittel>
                <SykmeldingPerioder perioder={sykmelding.perioder} />
                <DiagnoseSeksjon diagnose={sykmelding.medisinskVurdering.hovedDiagnose} />
                {sykmelding.medisinskVurdering.biDiagnoser.map((diagnose, index) => (
                    <DiagnoseSeksjon key={index.toString()} diagnose={diagnose} bidiagnose />
                ))}
                <FraverSeksjon fraver={sykmelding.medisinskVurdering.annenFraversArsak} />
                <SvangerskapSeksjon svangerskap={sykmelding.medisinskVurdering.svangerskap} />
                <SkadeSeksjon medisinskVurdering={sykmelding.medisinskVurdering} />
                <ArbeidsuforSeksjon prognose={sykmelding.prognose} />
                <PrognoseSeksjon prognose={sykmelding.prognose} />
                <ArbeidsgiverSeksjon arbeidsgiver={sykmelding.arbeidsgiver} />
                <LegeSeksjon navn={sykmelding.navnFastlege} />

                <Utvidbar
                    ikon={doktor}
                    ikonHover={doktorHover}
                    tittel={tekster['ny-sykmelding.flere-opplysninger.tittel']}
                >
                    <BehandlingsDatoer
                        behandletTidspunkt={sykmelding.behandletTidspunkt}
                        syketilfelleStartDato={sykmelding.syketilfelleStartDato}
                    />
                    <MulighetForArbeid />
                    <Friskmelding prognose={sykmelding.prognose} />
                    <UtdypendeOpplysninger opplysninger={sykmelding.utdypendeOpplysninger} />
                    <Arbeidsevne
                        tiltakArbeidsplassen={sykmelding.tiltakArbeidsplassen}
                        tiltakNAV={sykmelding.tiltakNAV}
                    />
                    <SeksjonMedTittel tittel="Annet">
                        <ElementMedTekst margin tittel="Telefon til lege/sykmelder" tekst={sykmelding.behandler.tlf} />
                    </SeksjonMedTittel>
                </Utvidbar>
            </InfoPanel>

            <div ref={utfyllingRef} className="third">
                <h1>Bruk sykmeldingen</h1>
                Ifølge folketrygdloven har den to formål: melde fra om sykefravær til NAV og arbeidsgiveren slik at du
                kan få hjelp til å komme tilbake i jobb legge til rette for at du kan søke om sykepenger Les mer om
                hvordan NAV behandler personopplysninger
            </div>
            <div>riktige opplysninger</div>

            <div>jeg er sykmeldt fra</div>

            <Hovedknapp onClick={() => console.log('send')}>Send sykmeldingen</Hovedknapp>
            <Lenke href="www.nav.no">Jeg ønsker ikke å bruke denne sykmeldingen</Lenke>
        </div>
    );
};

export default NySykmelding;
