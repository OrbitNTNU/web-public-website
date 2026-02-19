import { Stack, Card, Text, Box } from "@sanity/ui";
import { set, unset } from "sanity";
import { StringInputProps } from "sanity";
import { iconOptions } from "./iconList";


export default function IconPicker(props: StringInputProps) {
    const { value, onChange } = props;

    return (
        <Stack space={3}>
            <Box
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))",
                    gap: 12,
                }}
            >
                {iconOptions.map((icon) => {
                    const Icon = icon.component;
                    const isSelected = value === icon.name;

                    return (
                        <Card
                            key={icon.name}
                            padding={3}
                            radius={2}
                            shadow={1}
                            tone={isSelected ? "primary" : "default"}
                            onClick={() =>
                                onChange(isSelected ? unset() : set(icon.name))
                            }
                            style={{
                                cursor: "pointer",
                                textAlign: "center",
                                transition: "all 0.2s ease",
                            }}
                        >
                            <Icon style={{ fontSize: 28 }} />
                            <Text size={1} style={{ marginTop: 6 }}>
                                {icon.name}
                            </Text>
                        </Card>
                    );
                })}
            </Box>
        </Stack>
    );
}
