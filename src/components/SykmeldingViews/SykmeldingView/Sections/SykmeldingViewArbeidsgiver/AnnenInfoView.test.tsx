import { render, screen } from '@testing-library/react'

import { Periodetype, RegelStatus, StatusEvent, Sykmelding } from '../../../../../fetching/graphql.generated'

import AnnenInfoView from './AnnenInfoView'

describe('AnnenInfoView', () => {
    it('Renders behandler phone if it exist', () => {
        const sykmelding: Sykmelding = {
            __typename: 'Sykmelding',
            id: '123',
            mottattTidspunkt: '2020-01-10',
            behandlingsutfall: {
                __typename: 'Behandlingsutfall',
                status: RegelStatus.Ok,
                ruleHits: [],
            },
            legekontorOrgnummer: null,
            arbeidsgiver: null,
            sykmeldingsperioder: [
                {
                    __typename: 'Periode',
                    fom: '2020-02-10',
                    tom: '2020-02-15',
                    behandlingsdager: 2,
                    type: Periodetype.Behandlingsdager,
                    reisetilskudd: false,
                    gradert: null,
                    innspillTilArbeidsgiver: null,
                    aktivitetIkkeMulig: null,
                },
            ],
            sykmeldingStatus: {
                __typename: 'SykmeldingStatus',
                timestamp: '2020-01-01',
                statusEvent: StatusEvent.Apen,
                sporsmalOgSvarListe: [],
                arbeidsgiver: null,
            },
            medisinskVurdering: null,
            skjermesForPasient: false,
            prognose: null,
            utdypendeOpplysninger: {},
            tiltakArbeidsplassen: null,
            tiltakNAV: null,
            andreTiltak: null,
            meldingTilNAV: null,
            meldingTilArbeidsgiver: null,
            kontaktMedPasient: {
                __typename: 'KontaktMedPasient',
                kontaktDato: '2020-04-01',
                begrunnelseIkkeKontakt: 'Han var kjempesyk',
            },
            behandletTidspunkt: '2020-01-01',
            behandler: {
                __typename: 'Behandler',
                fornavn: 'Frida',
                mellomnavn: 'Perma',
                etternavn: 'Frost',
                adresse: {
                    __typename: 'Adresse',
                    gate: null,
                    postnummer: null,
                    kommune: null,
                    postboks: null,
                    land: null,
                },
                tlf: '12345678',
            },
            syketilfelleStartDato: null,
            navnFastlege: null,
            egenmeldt: null,
            papirsykmelding: null,
            harRedusertArbeidsgiverperiode: null,
            merknader: null,
            pasient: {
                __typename: 'Pasient',
                fnr: '123456789',
                fornavn: null,
                mellomnavn: null,
                etternavn: null,
            },
        }

        render(<AnnenInfoView sykmelding={sykmelding} />)
        expect(screen.getByText('Tlf: 12345678')).toBeInTheDocument()
    })

    it('Render hyphen if behandler phone does noe exist', () => {
        const sykmelding: Sykmelding = {
            __typename: 'Sykmelding',
            id: '123',
            mottattTidspunkt: '2020-01-10',
            behandlingsutfall: {
                __typename: 'Behandlingsutfall',
                status: RegelStatus.Ok,
                ruleHits: [],
            },
            legekontorOrgnummer: null,
            arbeidsgiver: null,
            sykmeldingsperioder: [
                {
                    __typename: 'Periode',
                    fom: '2020-02-10',
                    tom: '2020-02-15',
                    behandlingsdager: 2,
                    type: Periodetype.Behandlingsdager,
                    reisetilskudd: false,
                    gradert: null,
                    innspillTilArbeidsgiver: null,
                    aktivitetIkkeMulig: null,
                },
            ],
            sykmeldingStatus: {
                __typename: 'SykmeldingStatus',
                timestamp: '2020-01-01',
                statusEvent: StatusEvent.Apen,
                sporsmalOgSvarListe: [],
                arbeidsgiver: null,
            },
            medisinskVurdering: null,
            skjermesForPasient: false,
            prognose: null,
            utdypendeOpplysninger: {},
            tiltakArbeidsplassen: null,
            tiltakNAV: null,
            andreTiltak: null,
            meldingTilNAV: null,
            meldingTilArbeidsgiver: null,
            kontaktMedPasient: {
                __typename: 'KontaktMedPasient',
                kontaktDato: '2020-04-01',
                begrunnelseIkkeKontakt: 'Han var kjempesyk',
            },
            behandletTidspunkt: '2020-01-01',
            behandler: {
                __typename: 'Behandler',
                fornavn: 'Frida',
                mellomnavn: 'Perma',
                etternavn: 'Frost',
                adresse: {
                    __typename: 'Adresse',
                    gate: null,
                    postnummer: null,
                    kommune: null,
                    postboks: null,
                    land: null,
                },
                tlf: null,
            },
            syketilfelleStartDato: null,
            navnFastlege: null,
            egenmeldt: null,
            papirsykmelding: null,
            harRedusertArbeidsgiverperiode: null,
            merknader: null,
            pasient: {
                __typename: 'Pasient',
                fnr: '123456789',
                fornavn: null,
                mellomnavn: null,
                etternavn: null,
            },
        }

        render(<AnnenInfoView sykmelding={sykmelding} />)
        expect(screen.getByText('Tlf: —')).toBeInTheDocument()
    })
})
