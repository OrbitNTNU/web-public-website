import React, { useEffect, useState } from 'react'
import { Card, Text, Stack, Spinner, Flex, Label, Radio } from '@sanity/ui'
import { FormField } from 'sanity';
import { set, unset } from 'sanity'
import type { ArrayOfPrimitivesInputProps } from 'sanity'

interface Team {
    id: string;
    name: string;
}

export default function TeamsSelector(
    props: ArrayOfPrimitivesInputProps<string | number | boolean>
) {
    const { onChange, value = [] } = props
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchTeams(): Promise<void> {
            try {
                const res: Response = await fetch('https://lifesupport.orbitntnu.com/api/trpc/teams.getActiveTeamNamesWithIDs')
                const data: {
                    result: {
                        data: {
                            json: Team[];
                        };
                    };
                } = await res.json()
                setTeams(data.result.data.json);
            } catch (error) {
                console.error('Error fetching teams:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchTeams()
    }, [])

    function selectTeam(teamID: string): void {
        if (value[0] === teamID) {
            onChange(unset()) // Deselect if already selected
        } else {
            onChange(set([teamID]))
        }
    }

    return (
        <FormField>
            <Card padding={4} radius={3} shadow={1} border tone="default">
                {loading ? (
                    <Flex justify="center" padding={4}>
                        <Spinner muted />
                    </Flex>
                ) : (
                    <Stack space={3}>
                        {teams.map((team: Team) => {
                            const isSelected = value[0] === team.id;
                            return (
                                <Flex
                                    key={team.id}
                                    align="center"
                                    gap={2}
                                    style={{
                                        cursor: "pointer",
                                        transition: "background 0.2s"
                                    }}
                                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                                    onClick={() => selectTeam(team.id)}
                                >
                                    <span
                                        style={{
                                            display: "inline-flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            width: 10,
                                            height: 10,
                                            borderRadius: "50%",
                                            border: "solid #666",
                                            marginRight: 8,
                                            background: "#fff",
                                            position: "relative"
                                        }}
                                    >
                                        <Radio
                                            id={team.id}
                                            checked={isSelected}
                                            readOnly
                                            style={{
                                                opacity: 0,
                                                width: 20,
                                                height: 20,
                                                position: "absolute",
                                                left: 0,
                                                top: 0,
                                                margin: 0,
                                                zIndex: 1
                                            }}
                                        />
                                        {isSelected && (
                                            <span
                                                style={{
                                                    width: 10,
                                                    height: 10,
                                                    borderRadius: "50%",
                                                    background: "#222", // darker inner circle
                                                    display: "block",
                                                    zIndex: 2
                                                }}
                                            />
                                        )}
                                    </span>
                                    <Label htmlFor={team.id}>
                                        <Text size={2}>
                                            {team.name}
                                        </Text>
                                    </Label>
                                </Flex>
                            );
                        })}
                    </Stack>
                )}
            </Card>
        </FormField>
    );
}
