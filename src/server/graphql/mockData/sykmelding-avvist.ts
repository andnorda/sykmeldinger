import { Sykmelding } from '../../api-models/sykmelding/Sykmelding'
import { dateAdd, dateSub } from '../../../utils/dateUtils'
import {
    AnnenFraverGrunn,
    ArbeidsrelatertArsakType,
    MedisinskArsakType,
    Periodetype,
    RegelStatus,
    StatusEvent,
} from '../resolver-types.generated'

export function sykmeldingAvvist(mottatt = dateSub(new Date(), { months: 1 })): Sykmelding {
    return {
        id: 'AVVIST',
        mottattTidspunkt: mottatt,
        behandlingsutfall: {
            status: RegelStatus.Invalid,
            ruleHits: [
                {
                    messageForSender: 'Sykmeldingen er tilbakedatert mer enn det som er tillat',
                    messageForUser: 'Sykmeldingen er tilbakedatert mer enn det som er tillat',
                    ruleName: 'tilbakedatering',
                    ruleStatus: RegelStatus.Invalid,
                },
            ],
        },
        arbeidsgiver: {
            navn: 'Navn Navnesen',
        },
        sykmeldingsperioder: [
            {
                fom: dateAdd(mottatt, { days: 2 }),
                tom: dateAdd(mottatt, { days: 5 }),
                behandlingsdager: 2,
                reisetilskudd: false,
                type: Periodetype.Behandlingsdager,
                gradert: null,
                innspillTilArbeidsgiver: null,
                aktivitetIkkeMulig: null,
            },
            {
                fom: dateAdd(mottatt, { days: 6 }),
                tom: dateAdd(mottatt, { days: 10 }),
                type: Periodetype.AktivitetIkkeMulig,
                aktivitetIkkeMulig: {
                    medisinskArsak: {
                        beskrivelse: 'Han er veldig syk',
                        arsak: [MedisinskArsakType.TilstandHindrerAktivitet],
                    },
                    arbeidsrelatertArsak: {
                        beskrivelse: 'Kan ikke jobbe fordi han ikke har hev-/senk-bord',
                        arsak: [ArbeidsrelatertArsakType.ManglendeTilrettelegging],
                    },
                },
                reisetilskudd: false,
                gradert: null,
                innspillTilArbeidsgiver: null,
                behandlingsdager: null,
            },
            {
                fom: dateAdd(mottatt, { days: 11 }),
                tom: dateAdd(mottatt, { days: 15 }),
                type: Periodetype.Reisetilskudd,
                reisetilskudd: true,
                behandlingsdager: null,
                innspillTilArbeidsgiver: null,
                gradert: null,
                aktivitetIkkeMulig: null,
            },
        ],
        sykmeldingStatus: {
            timestamp: '2020-01-01',
            statusEvent: StatusEvent.Apen,
            sporsmalOgSvarListe: [],
            arbeidsgiver: null,
        },
        medisinskVurdering: {
            hovedDiagnose: {
                system: '2.16.578.1.12.4.1.1.7170',
                kode: 'K24',
                tekst: 'Rar sykdom',
            },
            biDiagnoser: [
                {
                    system: '2.16.578.1.12.4.1.1.7170',
                    kode: '-57',
                    tekst: 'Rar sykdom',
                },
                {
                    system: '2.16.578.1.12.4.1.1.7170',
                    kode: '-59',
                    tekst: 'Sykdom0',
                },
            ],
            svangerskap: true,
            yrkesskade: true,
            yrkesskadeDato: '2018-10-18',
            annenFraversArsak: {
                beskrivelse:
                    'word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word word',
                grunn: [AnnenFraverGrunn.Abort],
            },
        },
        skjermesForPasient: false,
        utdypendeOpplysninger: {
            '6.2': {
                '6.2.1': {
                    sporsmal: 'Dette er et spørsmål',
                    svar: 'Dette er et svar',
                    restriksjoner: [],
                },
            },
        },
        kontaktMedPasient: {
            kontaktDato: null,
            begrunnelseIkkeKontakt: null,
        },
        behandletTidspunkt: '2020-01-01',
        behandler: {
            fornavn: 'Fornavn',
            mellomnavn: null,
            etternavn: 'Etternavn',
            adresse: {
                gate: 'Gateveien 4',
                postnummer: 1001,
                kommune: 'Oslo',
                postboks: '1212 Gateveien',
                land: 'NO',
            },
            tlf: '900 00 000',
        },
        syketilfelleStartDato: '2018-10-10',
        navnFastlege: 'Doktor Legesen',
        egenmeldt: false,
        papirsykmelding: false,
        harRedusertArbeidsgiverperiode: false,
        pasient: {
            fnr: '12345678901',
            fornavn: 'Ola',
            mellomnavn: null,
            etternavn: 'Nordmann',
        },
        andreTiltak: null,
        legekontorOrgnummer: null,
        meldingTilArbeidsgiver: null,
        meldingTilNAV: null,
        merknader: null,
        prognose: null,
        tiltakArbeidsplassen: null,
        tiltakNAV: null,
    }
}
